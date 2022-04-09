function patientCount(){
	const nbp=document.querySelector('#nbp');
	    var size;
	    db.collection('patients').get().then(snap => {
    	size = snap.size
		nbp.innerHTML=size;
		});
}
function renderGlobalStat(nbCTT,nbTT){
    const nbtt=document.querySelector('#nbtt');
        const ts=document.querySelector('#ts');
        const s=document.querySelector('#s');
        const ms=document.querySelector('#ms');
        const ps=document.querySelector('#ps');
        const pts=document.querySelector('#pts');
        nbtt.innerHTML=nbTT;
        ts.innerHTML=((nbCTT[0]*100)/nbTT).toFixed(2)+" % ";
		s.innerHTML=((nbCTT[1]*100)/nbTT).toFixed(2)+" % ";
		ms.innerHTML=((nbCTT[2]*100)/nbTT).toFixed(2)+" % ";
		ps.innerHTML=((nbCTT[3]*100)/nbTT).toFixed(2)+" % ";
		pts.innerHTML=((nbCTT[4]*100)/nbTT).toFixed(2)+" % ";
}
function renderMax(somCat,nbCTT,ts,s,ms,ps,pts){
    i=0;
    var maxR=[];
    for(i=0;i<5;i++){
            maxR[i]=0;
        }
    var maxCR=[];
    for(i=0;i<5;i++){
            maxCR[i]="";
        }
	Object.entries(somCat.sts).forEach(([key, value]) => {
		if(value>maxR[0]){
			maxR[0]=value;
			maxCR[0]=key;
		}
	});
	Object.entries(somCat.ss).forEach(([key, value]) => {
		if(value>maxR[1]){
			maxR[1]=value;
			maxCR[1]=key;
		}
	});
	Object.entries(somCat.sms).forEach(([key, value]) => {
		if(value>maxR[2]){
			maxR[2]=value;
			maxCR[2]=key;
		}
	});
	Object.entries(somCat.sps).forEach(([key, value]) => {
		if(value>maxR[3]){
			maxR[3]=value;
			maxCR[3]=key;
		}
	});
	Object.entries(somCat.spts).forEach(([key, value]) => {
		if(value>maxR[4]){
			maxR[4]=value;
			maxCR[4]=key;
		}
	});
    
    const cts=document.querySelector(ts);
    const cs=document.querySelector(s);
    const cms=document.querySelector(ms);
    const cps=document.querySelector(ps);
    const cpts=document.querySelector(pts);
    cts.innerHTML=maxCR[0]+"("+((maxR[0]*100)/nbCTT[0]).toFixed(2)+"%)";
    cs.innerHTML=maxCR[1]+"("+((maxR[1]*100)/nbCTT[1]).toFixed(2)+"%)";
    cms.innerHTML=maxCR[2]+"("+((maxR[2]*100)/nbCTT[2]).toFixed(2)+"%)";
    cps.innerHTML=maxCR[3]+"("+((maxR[3]*100)/nbCTT[3]).toFixed(2)+"%)";
    cpts.innerHTML=maxCR[4]+"("+((maxR[4]*100)/nbCTT[4]).toFixed(2)+"%)";
}
function renderCategoriesDetails(somCat,t,nbCTT,categories,type){
	emojis=["Très Sat","Sat","Moy Sat","Peu","Pas de tt Sat"];
    const tcat=document.querySelector(t);
	var 
	i=0,j;
	var c=new Array(categories.length);
	for(i;i<categories.length;i++){
		c[i]=new Array(5);
		j=0;
		for(j;j<5;j++){
			c[i][j]=0;
		}
	}
    i=0;
	Object.entries(somCat).forEach(([keyS, valueS]) => {
		j=0;
		Object.entries(valueS).forEach(([key, value]) => {
					c[j][i]=value;
					j++;		
		});
		i++;
	});
	for(i=0;i<categories.length;i++){
		let tr=document.createElement('tr');
		let td=document.createElement('td');
		td.setAttribute('class','th');
		td.setAttribute('scope','row');
		td.setAttribute('data-th',type+":");
		td.textContent=categories[i];
		tr.appendChild(td);
		j=0;
		for(j;j<5;j++){
			let td=document.createElement('td');
			td.textContent=c[i][j]+"("+((c[i][j]*100)/nbCTT[j]).toFixed(1)+"%)";
			tr.appendChild(td);
		}
		tcat.appendChild(tr);
	}
	let tr=document.createElement('tr');
	tr.setAttribute('style','background-color:  rgba(0, 0, 0, 0.4)');
		let td=document.createElement('td');
		td.setAttribute('class','th');
		td.setAttribute('scope','row');
		td.textContent="Total";
		td.setAttribute('style',"color:white");
		tr.appendChild(td);
		j=0;
		for(j;j<5;j++){
			let td=document.createElement('td');
			td.setAttribute('style',"font-weight:bold");
			td.textContent=nbCTT[j]+"("+((nbCTT[j]*100)/nbTT).toFixed(1)+"%)";
			tr.appendChild(td);
		}
		tcat.appendChild(tr);
}
function createLi(ul,id,src,st){
	let li=document.createElement('li');
	let strong=document.createElement('strong');
	strong.textContent=st;
	strong.setAttribute('id',id);
	li.appendChild(strong);
	let img=document.createElement('img');
	img.setAttribute('id','emj');
	img.setAttribute('src',src);
	li.appendChild(img);
	ul.appendChild(li);
}
function emojiCount(doc,emoji){
	var i,nb=0;
    for(i=0;i<25;i++){
        if(doc.data().responses[i].emoji==emoji){
			nb++;
		}
	}
	return nb;
}
function renderGlobalPatientStat(doc,code){
	let div=document.createElement('div');
		div.setAttribute('class','pricing-box pricing-box-bg-image text-center');
		div.setAttribute('id','idgs');
		let p=document.createElement('p');
		p.setAttribute('class','price');
		let sup=document.createElement('sup');
		sup.textContent="patient";
		p.appendChild(sup);
		span=document.createElement('span');
		span.textContent=code;
		p.appendChild(span);
		div.appendChild(p);
		let ul=document.createElement('ul');
		ul.setAttribute('class','features-list');
		createLi(ul,"st","img/emoji/tres s.png",emojiCount(doc,"tres satisfaisants")+"("+((emojiCount(doc,"tres satisfaisants")*100)/25).toFixed(2)+"%)");  
		createLi(ul,"s","img/emoji/s.png",emojiCount(doc,"satisfaisants")+"("+((emojiCount(doc,"satisfaisants")*100)/25).toFixed(2)+"%)");  
		createLi(ul,"ms","img/emoji/moyen s.png",emojiCount(doc,"moyennement satisfaisants")+"("+((emojiCount(doc,"moyennement satisfaisants")*100)/25).toFixed(2)+"%)");
		createLi(ul,"ps","img/emoji/peu s.png",emojiCount(doc,"peu satisfaisants")+"("+((emojiCount(doc,"peu satisfaisants")*100)/25).toFixed(2)+"%)");
		createLi(ul,"pts","img/emoji/pas de tt s.png",emojiCount(doc,"pas de tout satisfaisants")+"("+((emojiCount(doc,"pas de tout satisfaisants")*100)/25).toFixed(2)+"%)");
		div.appendChild(ul);
		gs.appendChild(div);		
}
function createTh(tr,src){
	th=document.createElement('th');
	th.setAttribute('scope','col');
	img=document.createElement('img');
	img.setAttribute('src',src);
	img.setAttribute('id','emjq');
	th.appendChild(img);
	tr.appendChild(th);
}
function renderTableDetails(table,doc){	
	var i,j,tabEmojis=["tres satisfaisants","satisfaisants","moyennement satisfaisants","peu satisfaisants","pas de tout satisfaisants"];
	var emojis=["Très Sat","Sat","Moy Sat","Peu","Pas de tt Sat"];
	let tquest=document.createElement('tbody');
	tquest.setAttribute('id','tquest');
	for(i=0;i<25;i++){
		let tr=document.createElement('tr');
		let td=document.createElement('td');
		td.setAttribute('data-th','Question');
		td.setAttribute('class','th');
		td.textContent=doc.data().responses[i].question;
		td.setAttribute('style','background-color:  rgba(0, 0, 0, 0.4);font-weight:bold');
		tr.appendChild(td);
		for(j=0;j<5;j++){
			let td=document.createElement('td');
			td.setAttribute('class','fa fa-check');
			if(doc.data().responses[i].emoji==tabEmojis[j]){
				
				td.setAttribute('data-th',tabEmojis[j]);
				td.setAttribute('style','color:rgb(20, 141, 36);text-align:center;');
				
			}
			else{
				td.textContent="";
				td.setAttribute('class','fa fa-times');
				td.setAttribute('data-th',tabEmojis[j]);
				td.setAttribute('style','color:#B22222;text-align:center;');
				
			}	
			tr.appendChild(td);
		}
		
		tquest.appendChild(tr);
		
	}
	let tr=document.createElement('tr');
		tr.setAttribute('style','background-color: white;text-align:center');
		let th=document.createElement('th');
		th.setAttribute('scope','row');
		th.textContent="Total";
		th.setAttribute('style','color:white');
		tr.appendChild(th);
		j=0;
		for(j;j<5;j++){
			let td=document.createElement('td');
			
			td.setAttribute('style','font-weight:bold;color:rgb(20, 141, 36)');
			td.setAttribute('data-th',emojis[j]+": ");
			td.textContent=emojiCount(doc,tabEmojis[j]);
			tr.appendChild(td);
		}
		tquest.appendChild(tr);
	table.appendChild(tquest);
}
function renderDetailsPatientStat(doc,code){
	table=document.createElement('table');
	table.setAttribute('class','table table-striped pqt');
	table.setAttribute('id','quest-table');
	table.setAttribute('style',"background-image: url('img/med.jpg');");
	thead=document.createElement('thead');
	tr=document.createElement('tr');
	th=document.createElement('th');
	th.setAttribute('style','color: white;z-index: 2;');
	th.textContent="Question";
	tr.appendChild(th);
	createTh(tr,"img/emoji/tres s.png");
	createTh(tr,"img/emoji/s.png");
	createTh(tr,"img/emoji/moyen s.png");
	createTh(tr,"img/emoji/peu s.png");
	createTh(tr,"img/emoji/pas de tt s.png");
	thead.appendChild(tr);
	table.appendChild(thead);
	ds.appendChild(table);
	renderTableDetails(table,doc);
}

function renderDetailsPatientAvis(doc,code){
	tabAvis=[];j=0;tabQuestion=[];
	for(i=0;i<25;i++){
		if(doc.data().responses[i].avis!=""){
			tabAvis[j]=doc.data().responses[i].avis;
			tabQuestion[j]=doc.data().responses[i].question;
			j++;
		}
	}
	if(tabAvis.length!=0){
		table=document.createElement('table');
		table.setAttribute('class','table table-striped pqt');
		table.setAttribute('id','quest-table');
		table.setAttribute('style',"background-image: url('img/med.jpg');");
		thead=document.createElement('thead');
		tr=document.createElement('tr');
		th=document.createElement('th');
		th.setAttribute('style','color: white;z-index: 2;');
		th.textContent="Question";
		tr.appendChild(th);
		th=document.createElement('th');
		th.setAttribute('style','color: white;z-index: 2;');
		th.textContent="Avis";
		tr.appendChild(th);
		thead.appendChild(tr);
		table.appendChild(thead);
		ds.appendChild(table);
		let tquest=document.createElement('tbody');
		tquest.setAttribute('id','tquest');
		for(i=0;i<tabAvis.length;i++){
			let tr=document.createElement('tr');
			let td=document.createElement('td');
			
			td.setAttribute('data-th','Question:');
			td.setAttribute('class','th');
			td.textContent=tabQuestion[i];
			tr.appendChild(td);
			let tdd=document.createElement('td');
			tdd.textContent=tabAvis[i];
			tdd.setAttribute('style','font-weight:bold');
			tr.appendChild(tdd);
			tquest.appendChild(tr);
		}
		table.appendChild(tquest);
	}else{
		let div=document.createElement('div');
		div.setAttribute('class','alert alert-warning');
		div.setAttribute('id','alert-avis');
		div.setAttribute('style','text-align:center');
		div.textContent="Aucun avis à afficher";
		ds.appendChild(div);
	}

}
function renderPatientResponses(code){
	var docRef = db.collection("patients").doc(code);
	docRef.get().then(function(doc) {
    if(doc.exists){
		renderGlobalPatientStat(doc,code);
		renderDetailsPatientStat(doc,code);
		renderDetailsPatientAvis(doc,code);
    }else{
        let div=document.createElement('div');
		div.setAttribute('class','alert alert-warning');
		div.setAttribute('id','alert-form');
		div.setAttribute('style','margin-top: 5%;');
		div.textContent="Patient inexistant";
		form.appendChild(div);
        
    }
});

}
function renderPatientList(){
	const tpatient=document.querySelector("#tpatient");
	const collection = db.collection('patients');
	patientList=[];i=0;
	collection.get().then(snapshot => {
	  snapshot.forEach(doc => {
		let tr=document.createElement('tr');
		tr.setAttribute('id',doc.data().code);
		let td=document.createElement('td');
		td.setAttribute('class','th');
		td.setAttribute('scope','row');
		td.setAttribute("style","font-weight:bold");
		td.textContent=doc.data().code;
		tr.appendChild(td);
		let tdd=document.createElement('td');
		tdd.setAttribute('class','th');
		tdd.setAttribute('scope','row');
		//tdd.setAttribute("style","text-align:center;");
		tdd.textContent=doc.data().date;
		tr.appendChild(tdd);
		tpatient.appendChild(tr);

  	  });
	});
}
function deletePatient(code){
	var docRef = db.collection("patients").doc(code);
	docRef.get().then(function(doc) {
    if(doc.exists){
		if(confirm("Êtes-vous sûr de supprimer les réponses de  "+code+" ?")){
			db.collection("patients").doc(code).delete().then(function() {
				let tr=document.getElementById(code);
				let tpatient=document.getElementById("tpatient");
				tpatient.removeChild(tr);
				var size;
				db.collection('patients').get().then(snap => {
				size = snap.size;
				if(size==0){
					window.location.href = "statistique.html";
				}else{
					nbp.innerHTML=size;
				}
				
				});
			}).catch(function(error) {
				alert("erreur de suppression");
			});
		}
    }else{
        let div=document.createElement('div');
		div.setAttribute('class','alert alert-warning');
		div.setAttribute('id','alert-form');
		div.setAttribute('style','margin-top: 5%;');
		div.textContent="Patient inexistant";
		form.appendChild(div);
        
    }
});
}