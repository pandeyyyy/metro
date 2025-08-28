const API_BASE = 'http://localhost:8000/api/v1';

class MetroApp {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.debounceTimer = null;
    }

    initElements() {
        this.startInput = document.getElementById('startStation');
        this.endInput = document.getElementById('endStation');
        this.startSuggestions = document.getElementById('startSuggestions');
        this.endSuggestions = document.getElementById('endSuggestions');
        this.findBtn = document.getElementById('findRoute');
        this.swapBtn = document.getElementById('swapStations');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.error = document.getElementById('error');
        this.totalTime = document.getElementById('totalTime');
        this.totalStations = document.getElementById('totalStations');
        this.estimatedFare = document.getElementById('estimatedFare');
        this.totalInterchanges = document.getElementById('totalInterchanges');
        this.pathContainer = document.getElementById('pathContainer');
        this.errorMessage = document.getElementById('errorMessage');
    }

    bindEvents() {
        this.startInput.addEventListener('input', () => this.handleInput('start'));
        this.endInput.addEventListener('input', () => this.handleInput('end'));
        this.findBtn.addEventListener('click', () => this.findRoute());
        this.swapBtn.addEventListener('click', () => this.swapStations());
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-group')) {
                this.hideSuggestions();
            }
        });

        // Enter key support
        this.startInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.findRoute();
        });
        this.endInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.findRoute();
        });
    }

    handleInput(type) {
        clearTimeout(this.debounceTimer);
        const input = type === 'start' ? this.startInput : this.endInput;
        const value = input.value.trim();

        if (value.length < 2) {
            this.hideSuggestions();
            return;
        }

        this.debounceTimer = setTimeout(() => {
            this.getSuggestions(value, type);
        }, 300);
    }

    async getSuggestions(query, type) {
        try {
            const endpoint = type === 'start' ? '/recommend1' : '/recommend2';
            const response = await fetch(API_BASE + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stationName: query })
            });

            const data = await response.json();
            const suggestions = type === 'start' ? data.recommendations1 : data.recommendations2;
            this.showSuggestions(suggestions, type);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    showSuggestions(suggestions, type) {
        const container = type === 'start' ? this.startSuggestions : this.endSuggestions;
        const input = type === 'start' ? this.startInput : this.endInput;
        
        if (!suggestions || suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        const suggestionHTML = suggestions.map(station => 
            '<div class="suggestion-item" data-station="' + station + '">' + this.capitalizeStation(station) + '</div>'
        ).join('');
        
        container.innerHTML = suggestionHTML;
        container.style.display = 'block';

        // Add click handlers
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.dataset.station;
                this.hideSuggestions();
            });
        });
    }

    hideSuggestions() {
        this.startSuggestions.style.display = 'none';
        this.endSuggestions.style.display = 'none';
    }

    swapStations() {
        const temp = this.startInput.value;
        this.startInput.value = this.endInput.value;
        this.endInput.value = temp;
    }

    async findRoute() {
        const startStation = this.startInput.value.trim();
        const endStation = this.endInput.value.trim();

        if (!startStation || !endStation) {
            this.showError('Please enter both start and end stations');
            return;
        }

        if (startStation.toLowerCase() === endStation.toLowerCase()) {
            this.showError('Start and end stations cannot be the same');
            return;
        }

        this.hideAll();
        this.loading.classList.remove('hidden');

        try {
            const response = await fetch(API_BASE + '/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startStation, endStation })
            });

            const data = await response.json();

            if (data.message) {
                this.showError(data.message);
            } else {
                this.showResults(data);
            }
        } catch (error) {
            console.error('Error finding route:', error);
            this.showError('Network error. Please check if the server is running.');
        }
    }

    showResults(data) {
        this.hideAll();
        
        // Debug logs
        console.log('=== FRONTEND DEBUG ===');
        console.log('Received data:', data);
        console.log('data.estimatedFare:', data.estimatedFare);
        console.log('typeof data.estimatedFare:', typeof data.estimatedFare);
        console.log('=== END FRONTEND DEBUG ===');
        
        this.totalTime.textContent = Math.round(data.totalTime) + ' min';
        this.totalStations.textContent = data.finalPath.length;
        this.estimatedFare.textContent = '₹' + (data.estimatedFare || 'N/A');
        this.totalInterchanges.textContent = data.interChanges.length;

        this.renderPath(data.finalPath, data.interChanges);
        this.results.classList.remove('hidden');
    }

    renderPath(path, interchanges) {
        const pathHTML = path.map((station, index) => {
            const isInterchange = interchanges.includes(station.station);
            const lineColor = station.color2 || station.color1;
            const lineName = lineColor ? lineColor.replace('Color', '') : 'default';

            return '<div class="station-item ' + (isInterchange ? 'interchange' : '') + '">' +
                '<div class="station-dot ' + lineName + '"></div>' +
                '<div class="station-name">' + this.capitalizeStation(station.station) + '</div>' +
                '<div class="station-line">' + this.getLineName(lineName) + '</div>' +
                (isInterchange ? '<span style="margin-left: 10px; color: #ffc107;">🔄</span>' : '') +
                '</div>';
        }).join('');
        
        this.pathContainer.innerHTML = pathHTML;
    }

    showError(message) {
        this.hideAll();
        this.errorMessage.textContent = message;
        this.error.classList.remove('hidden');
    }

    hideAll() {
        this.loading.classList.add('hidden');
        this.results.classList.add('hidden');
        this.error.classList.add('hidden');
        this.hideSuggestions();
    }

    capitalizeStation(station) {
        return station.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    getLineName(color) {
        const lineNames = {
            blue: 'Blue Line',
            bluebranch: 'Blue Branch',
            yellow: 'Yellow Line',
            red: 'Red Line',
            green: 'Green Line',
            greenbranch: 'Green Branch',
            violet: 'Violet Line',
            pink: 'Pink Line',
            pinkbranch: 'Pink Branch',
            magenta: 'Magenta Line',
            orange: 'Orange Line',
            grey: 'Grey Line'
        };
        return lineNames[color] || 'Metro Line';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MetroApp();
});
