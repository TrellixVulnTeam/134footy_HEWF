buildHtml();

import {auth, database} from './db.js';
function buildHtml() {

    var db = database;
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var tBody = document.querySelector('#template');
    var counter = 0;

    db.ref('team/players/').once('value').then(x => {
        x.forEach(y => {
            db.ref('team/players/' + y.key).on('value', function (snapshot) {
                let name = snapshot.val().fname + " " + snapshot.val().lname;
                let position = snapshot.val().position;
                let jerseynum = snapshot.val().jerseynumber;
                let dob = new Date(snapshot.val().dob);
                let age = today_year - dob.getFullYear();

                if (today_month < (dob.getMonth() + 1)) {
                    age--;
                }
                if (((dob.getMonth() + 1) == today_month) && (today_day < dob.getDate())) {
                    age--;
                }

                let el = document.createElement("tr");
                el.id = counter;
                el.innerHTML = `<td></td><td>${name}</td><td>${position}</td><td>${jerseynum}</td><td>${age}</td>`;
                el.onclick = function () { edit(this.id) };
                console.log(el);
                tBody.appendChild(el);
                counter++;

            });

        });
    });
}


function edit(id) {
                window.location.href = `viewplayer.html?id=${id}`;
}
           