/**
 *   on 2016-04-19.
 */

import React from 'react';
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Note: DockMonitor is visible by default.
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 changeMonitorKey='ctrl-m'
                 defaultIsVisible={false}
                 defaultSize={0.25}>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);