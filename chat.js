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
					btn.onclick = () => otworz_Chat(znajomy);
					btn.classList.add("btn-small", "btn-accept");


					li.appendChild(btn);
					znajomi.appendChild(li);
				 });

	
        
	})



	
};


function otworz_chat(log_z){
	document.getElementById("wiadomosci").style.display = "block";
	document.getElementById("wysylanie").style.display = "block";
	localStorage.setItem("log_z", log_z);
	const wiadomosci = document.getElementById("wiadomosci");




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
					date.textContent = " (" + w.data + ")";

					
					const user = document.createElement("strong");
					user.textContent = w.user;

					const text = document.createTextNode(":\n" + w.wiadomosc);

					li.appendChild(date);
					li.appendChild(user);
					li.appendChild(text);
					li.appendChild(document.createElement("br"));
					
        			
					
					wiadomosci.appendChild(li);
				 });

	
        
	})






	
};




