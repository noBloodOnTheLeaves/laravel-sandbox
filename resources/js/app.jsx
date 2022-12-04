//import './bootstrap';
import '../css/app.css';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
//import ReactDOMServer from "react-dom/server";
import {createInertiaApp} from "@inertiajs/inertia-react";
//import {createRoot} from "react-dom";
import {createRoot} from "react-dom/client";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from './theme';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Larasand';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    /*setup: ({ App, props }) => {
            route(name, params, absolute, {
                ...page.props.ziggy,
                location: new URL(page.props.ziggy.location),
            });
        return <App {...props} />;
    },*/
    setup({ el, App, props }) {
        createRoot(document.getElementById("root")).render(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Container maxWidth="lg">
                        <App {...props} />
                    </Container>
            </ThemeProvider>
            ,
            el);
    },
})

InertiaProgress.init({ color: '#4B5563' });
