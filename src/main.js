import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import components from './components/UI/index';
import './styles/style.scss';

const widgets = document.querySelectorAll('weather-widget');

widgets.forEach((widget, index) => {
    widget.classList.add('weather-widget');
    widget.classList.add(`weather-widget-${index}`);

    const app = createApp(App);
    app.use(store);
    components.forEach((component) => app.component(component.name, component));
    app.mount(`.${widget.classList.toString().split(' ').join('.')}`);
});
