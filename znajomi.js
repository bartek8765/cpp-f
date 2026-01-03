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
          document.getElementById("result").innerText = "Zaloguj się, aby wyświetlić znajomych";
        }
   
 };








function wyswietl_znajomych() {
const znajomi = document.getElementById("znajomi");
const zaproszenia = document.getElementById("zaproszenia");



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
					znajomi.appendChild(li);
				 });


				zaproszenia.innerHTML = "";
				const lista_zaproszen = data.lista_zaproszen || [];
				lista_zaproszen.forEach(zaproszenie => { 
					const li = document.createElement("li");
        			li.textContent = zaproszenie + " ";

					const btn = document.createElement("button");
					btn.textContent = "Akceptuj";
					btn.onclick = () => akceptujZaproszenie(zaproszenie);
					
					li.appendChild(btn);
					zaproszenia.appendChild(li);
				 });
	
        
	})



	
};



function zapros(){

const login_znajomego = document.getElementById("znajomy_login").value;
const login = localStorage.getItem("login");
const pass = localStorage.getItem("password");

	if(login && pass){


		

			fetch("https://cpp-b.onrender.com/zapros", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: login,
                    pass: pass,
					login_znajomego: login_znajomego
                })
            }).then(res => res.json())
            .then(data => {
                document.getElementById("result").innerText =
                   data.komunikat;
            })




		
	}


	
};
