 window.onload = function() {
		document.getElementById("admin_panel").style.display = "none";
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

			document.getElementById("log").value=login;
			document.getElementById("pass").value=pass;
			zaloguj();
		
		}
			
		
            
        };





	function zaloguj() {
			document.getElementById("admin_panel").style.display = "none";
            const log = document.getElementById("log").value;
            const pass = document.getElementById("pass").value;
			const gallery = document.getElementById("gallery");
			document.getElementById("log").value="";
			document.getElementById("pass").value="";

            fetch("https://cpp-b.onrender.com/login", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: log,
                    pass: pass
                })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("result").innerText = data.komunikat;
				if (!data.komunikat.startsWith("Nieprawidłowy")) {
        			localStorage.setItem("password", pass);
     				localStorage.setItem("login", log);
				if(data.admin){
				document.getElementById("admin_panel").style.display = "block";
				}
				gallery.innerHTML = "";
				const linki = data.linki || [];
				linki.forEach(url => { 
					const img = document.createElement("img");
        			img.src = url;
					gallery.appendChild(img);
				 });
	
        }
	})

		
	};






	function zarejestruj() {
            const log = document.getElementById("log").value;
            const pass = document.getElementById("pass").value;

            fetch("https://cpp-b.onrender.com/zarejestruj", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: log,
                    pass: pass
                })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("result").innerText =
                   data.komunikat;
            })
	document.getElementById("log").value="";
	document.getElementById("pass").value="";
        };







	function admin_add() {

		const log = document.getElementById("admin_login").value;
            const url = document.getElementById("admin_url").value;

            fetch("https://cpp-b.onrender.com/admin_add", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: log,
                    url: url
                })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("result").innerText =
                   data.komunikat;
            })


	};






		function admin_remove() {

		const log = document.getElementById("admin_login").value;
        const url = document.getElementById("admin_url").value;

            fetch("https://cpp-b.onrender.com/admin_remove", {
                method: "POST",
                headers: {
                      "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    log: log,
                    url: url
                })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("result").innerText =
                   data.komunikat;
            })


	};
