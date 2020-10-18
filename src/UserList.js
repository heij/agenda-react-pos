import React, { useState } from 'react';
import UserCard from './UserCard';
import UserForm from './UserForm';

export default function UserList() {
    let [userToEdit, setUserToEdit] = useState(null);
    let [userList, setUserList] = useState([
        { id: 1, nome: 'João', email: 'joao@aol.com', empresa: 'SuperEmpresa1', cargo: 'Diretor' },
        { id: 2, nome: 'Maria', email: 'maria@gmail.com', empresa: 'SuperEmpresa2', cargo: 'Diretora' }
    ]);

    const toggleEdit = (user) => {
        setUserToEdit(user);
    }

    const addUser = (user) => {
        setUserList([user, ...userList]);
    }

    const editUser = (user) => {
        let listCopy = userList.slice();
        let userIndex = userList.findIndex(u => u.id == user.id);
        listCopy[userIndex] = user;
        setUserList(listCopy);
        setUserToEdit(null);
    }

    const deleteUser = (user) => {
        let updatedList = userList.filter(u => u.id != user.id);
        setUserList(updatedList);
    }

    let userCards = userList.map(user => (
        <UserCard key={user.id} data={user}
            _onDelete={deleteUser}
            _onEditToggle={toggleEdit} />
    ));

    return (
        <div className="p-2 text-white">
            <h1 className="text-2xl font-bold">Lista de Usuários</h1>
            <UserForm formType="add" _onConfirm={addUser} />
            {userToEdit &&
                <div>
                    <h3>Editando <span className="font-bold">{userToEdit.nome}</span></h3>
                    <UserForm formType="edit" _onConfirm={editUser}
                        data={userToEdit} />
                </div>}
            {userCards}
        </div>
    );
}