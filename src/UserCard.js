import React, { useState } from 'react';

export default function UserCard(props) {
    let { nome, email, empresa, cargo } = props.data;

    return (
        <div className="relative inline-block p-2 pr-4 m-2 bg-blue-400 rounded text-gray-800">
            <div className="font-bold">{nome}</div>
            <div className="">
                <span className="">{empresa}</span> (<span className="">{cargo}</span>)
            </div>
            <div className="">{email}</div>
            <div className="float-right">
                <button className="rounded p-1 m-1 bg-gray-400"
                    onClick={() => props._onEditToggle(props.data)}>Editar</button>
                <button className="rounded p-1 m-1 text-red-600 bg-red-200"
                    onClick={() => props._onDelete(props.data)}>X</button>
            </div>
        </div>
    );
}