import React, { useState } from 'react';

export default function UserForm(props) {
    let formType = props.formType;
    let user = props.data || {};
    let id = user.id;
    let [nome, setNome] = useState(user.nome);
    let [email, setEmail] = useState(user.email);
    let [empresa, setEmpresa] = useState(user.empresa);
    let [cargo, setCargo] = useState(user.cargo);
    let [nomeError, setNomeError] = useState(false);
    let [emailError, setEmailError] = useState(false);
    let [empresaError, setEmpresaError] = useState(false);
    let formErrorStyle = 'border border-red-600 text-red-400 ';

    const validateAndConfirm = () => {
        let user = { id, nome, email, empresa, cargo };
        if (!isUserValid(user)) return;
        if (!user.id) user.id = new Date().getTime();

        props._onConfirm(user);
        resetForm();
    }

    const isUserValid = ({ email, nome, empresa }) => {
        let valid = true;

        if (!/.+@.+\..+/.test(email)) {
            valid = false;
            setEmailError(true);
        } else setEmailError(false);

        if (!nome) {
            valid = false;
            setNomeError(true);
        } else setNomeError(false);

        if (!empresa) {
            valid = false;
            setEmpresaError(true);
        } else setEmpresaError(false);

        return valid;
    }

    const resetForm = () => {
        setEmail('');
        setNome('');
        setEmpresa('');
    }

    return (
        <div className="mb-4 ">
            { (nomeError || emailError || empresaError) &&
                <div className="text-red-400">
                    <ul>
                        {nomeError && <li>- O campo nome é obrigatório</li>}
                        {emailError && <li>- Insira um endereço de email válido</li>}
                        {empresaError && <li>- O campo empresa é obrigatório</li>}
                    </ul>
                </div>
            }
            <div className="flex flex-row text-black">
                <input type="text" placeholder="Nome"
                    className={`m-2 p-2 flex-1 ${nomeError && formErrorStyle}`}
                    onChange={(e) => setNome(e.target.value)}
                    value={nome || ''} />
                <input type="text" placeholder="Email"
                    className={`m-2 p-2 flex-1 ${emailError && formErrorStyle}`}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''} />
                <input type="text" placeholder="Empresa"
                    className={`m-2 p-2 flex-1 ${empresaError && formErrorStyle}`}
                    onChange={(e) => setEmpresa(e.target.value)}
                    value={empresa || ''} />
                <input type="text" placeholder="Cargo"
                    className={`m-2 p-2 'flex-1`}
                    onChange={(e) => setCargo(e.target.value)}
                    value={cargo || ''} />

                <button className="bg-blue-400 rounded m-2 p-2"
                    onClick={() => validateAndConfirm()}
                >{formType == 'add' ? 'Adicionar' : 'Salvar'}</button>
            </div>
        </div>
    );
}