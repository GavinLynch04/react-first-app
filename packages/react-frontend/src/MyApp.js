import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    function removeOneCharacter (index) {
        deleteFromList(index)
            .then((response) => {
                if (response.status === 204) {
                    const updated = characters.filter((character, i) => {
                        return i !== index
                    });
                    setCharacters(updated);
                } else {
                    console.error('User deletion failed.');
                }
            })

            .catch((error) => {
                console.log(error);
            })
    }

    function updateList(person) {
        postUser(person)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    console.error('User insertion failed.');
                }
            }).then(data => {
                person.name = data.name;
                person.job = data.job;
                setCharacters([...characters, person])
        })

            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function deleteFromList(index) {
        //get person from index then replace person.id
        const promise = fetch("Http://localhost:8000/users/" + characters[index].id + "/delete",
            {
                method: "DELETE",
            });
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    return (
        <div className="container">
            <Table characterData={characters}
                   removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;