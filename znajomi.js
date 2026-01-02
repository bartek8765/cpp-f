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
        }
        else{
          document.getElementById("result").innerText = "Zaloguj się, aby wyświetlić znajomych";
        }
   
 };
