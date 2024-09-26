#!/usr/bin/bash

npx workbox-cli generateSW worker-conf.js 
cp worker.js public/_sw.js
