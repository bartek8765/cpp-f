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
	
        
	})




	
};
