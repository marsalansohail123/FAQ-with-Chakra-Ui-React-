import app from './firebaseConfig'

import { getDatabase, ref, push, set, onValue, update, remove } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const database = getDatabase(app)
const auth = getAuth(app);

const writeQuesInDb = (obj) => {
    return new Promise((resolve, reject) => {
        const reference = ref(database, 'User Ques');
        const newRef = push(reference).key;
        const send = ref(database, `User Ques/${newRef}`);
        obj.id = newRef;
        set(send, obj)
            .then(() => resolve("Question Added."))
            .catch((err) => reject(`${err.message}`))
    });
}

const getDataFromDb = (nodeName, id) => {
    return new Promise((resolve, reject) => {
        const reference = ref(database, `${nodeName}/${id || ""}`)
        onValue(reference, (data) => {
            const dataVal = data.val();
            if (data) {
                resolve(dataVal)
                return;
            } else {
                reject('Error')
                return;
            }
        })
    })
}

const signUpUser = (obj) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const reference = ref(database, `Signup/${user.uid}`)
                obj.id = user.uid;
                set(reference, obj)
                    .then(() => {
                        resolve("Account Created Successfully");
                    })
                    .catch(err => reject(err.message));
            })
            .catch(error => reject(error.message));
    })
}

const loginUser = (obj) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const reference = ref(database, `Signup/${user.uid}`);
                onValue(reference, (credentialData) => {
                    let checkUser = credentialData.exists();
                    if (checkUser) {
                        resolve(credentialData.val());
                    }
                    else {
                        reject('User Not Found.')
                    }
                })
            })
            .catch(err => reject(err));
    })
}

const updateData = (newData) => {
    // console.log(newData);
    const editId = newData.id;
    // console.log(editId)
    const reference = ref(database, `User Ques/${editId}`);
    update(reference, newData)
        .then(() => console.log("Answer updated successfully"))
        .catch(() => console.log("Error"))
};

const deleteFromDb = (nodeName) => {
    const reference = ref(database, `${nodeName}`)
    remove(reference)
        .then(() => console.log("Successfully deleted."))
        .catch(err => console.log(err))
};

export { writeQuesInDb, getDataFromDb, loginUser, signUpUser, updateData, deleteFromDb };