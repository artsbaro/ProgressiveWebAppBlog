if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // registrado com sucesso
      console.log('ServiceWorker registrado com sucesso no escopo: ', registration.scope);
    }, function(err) {
      // registro falhou
      console.log('falha no registro do ServiceWorker: ', err);
    });
}
