let chatInterval = null;

window.onload = function() {
        document.getElementById("status").innerText = "Łączenie z serwerem...";
        fetch("https://cpp-b.onrender.com/")
        .then(res => res.text())
        .then(text => document.getElementById("status").innerText = "Status serwera: " + text)
        .catch(err => {console.error(err);
                        document.getElementById("status").innerText = "Błąd połączenia z serwerem";
                      });

        const login = localStorage.getItem("login");
		    const pass = localStorage.getItem("password");
	    	if(login && pass){
				document.getElementById("result").innerText = "Zalogowano jako: " + login;
				wyswietl_znajomych();
				
        }
        else{
          document.getElementById("result").innerText = "Zaloguj się, aby wyświetlić chat";
        }
   
 };




function wyswietl_znajomych() {
const znajomi = document.getElementById("znajomi");



	  fetch("https://cpp-b.onrender.com/wyswietl_znajomych", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: localStorage.getItem("login"),
                    pass: localStorage.getItem("password")
                })
            })
            .then(res => res.json())
            .then(data => {
                
				znajomi.innerHTML = "";
				const lista_znajomych = data.lista_znajomych || [];
				lista_znajomych.forEach(znajomy => { 
					const li = document.createElement("li");
        			li.textContent = znajomy;
					const btn = document.createElement("button");
					btn.textContent = "Otwórz chat";
					btn.onclick = () => otworz_chat(znajomy);
					btn.classList.add("btn-small", "btn-accept");


					li.appendChild(btn);
					znajomi.appendChild(li);
				 });

	
        
	})



	
};


function pobierz_wiadomosci(){

const log_z = localStorage.getItem("log_z");
const wiadomosci = document.getElementById("wiadomosci");

const isAtBottom = wiadomosci.scrollTop + wiadomosci.clientHeight >= wiadomosci.scrollHeight - 10;


	fetch("https://cpp-b.onrender.com/wyswietl_wiadomosci", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: localStorage.getItem("login"),
                    pass: localStorage.getItem("password"),
					log_z: log_z
                })
            })
            .then(res => res.json())
            .then(data => {
                
				wiadomosci.innerHTML = "";
				const lista_wiadomosci = data.lista_wiadomosci || [];
				lista_wiadomosci.forEach(w => { 
					const li = document.createElement("li");

					const date = document.createElement("small");
					date.textContent = formatDate(w.data);

					
					const user = document.createElement("strong");
					user.textContent = w.user + ": ";

					const text = document.createTextNode(w.wiadomosc);

					li.appendChild(date);
					li.appendChild(document.createElement("br"));
					li.appendChild(user);
					li.appendChild(document.createElement("br"));
					li.appendChild(text);
					
					
        			
					
					wiadomosci.appendChild(li);
					
				 });

	
        
	})


	

if (isAtBottom) {
    wiadomosci.scrollTo({
        top: wiadomosci.scrollHeight,
        behavior: "smooth"
    });
}



	
};




function otworz_chat(log_z){
	document.getElementById("wiadomosci").style.display = "block";
	document.getElementById("wysylanie").style.display = "block";
	document.getElementById("chat").style.display = "block";
	localStorage.setItem("log_z", log_z);
	

	pobierz_wiadomosci();

	if (chatInterval) clearInterval(chatInterval);
    chatInterval = setInterval(pobierz_wiadomosci, 3000); // co 3 sekundy


	
};


function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};


function wyslij_wiadomosc(){
	const login = localStorage.getItem("login");
	const pass = localStorage.getItem("password");
	const log_z = localStorage.getItem("log_z");
	const wiadomosc = document.getElementById("wiadomosc").value;
	document.getElementById("wiadomosc").value = "";


	if(login && pass && log_z){
	fetch("https://cpp-b.onrender.com/wyslij_wiadomosc", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: login,
                    pass: pass,
					log_z: log_z,
					wiadomosc: wiadomosc
                })
            })
            .then(res => res.json())
            .then(data => {

				document.getElementById("result").innerText = data.komunikat;
				otworz_chat(log_z);
				
			})
	}

	
	
};



