
document.addEventListener('deviceready', onDeviceReady, false);
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.innerHeight;

function onDeviceReady() {
    

    /*console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');*/

    
}

function redir(){
    self.location.href="statistique.html";
    }
    if(navigator.onLine){
        setTimeout(redir,3000);
    }else{
        alert('Vérifiez votre connexion internet SVP!');
    }
    
    

   



    

