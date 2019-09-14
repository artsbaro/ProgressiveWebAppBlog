"use strict";

//Installing
//Pre-cache App Shell
self.addEventListener('install', function(event) {
  console.log("SW: Evento de Instalacao");
  self.skipWaiting();
});

//Activating
//Clean up
self.addEventListener('activate', function(event) {
    console.log("SW: Evento de Ativacao");
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('SW: fetch recebido');
});