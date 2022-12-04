import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ContractEmail(props) {
    const [number, setNumber] = useState(undefined);
    const [listEmails, setListEmails] = useState([]);

    const getEmailByNumber = async () => {
        await fetch('/api/getEmailsByContractNumber?number=' + number)
            .then((response) => response.json())
            .then((data) => setListEmails(data));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Получить почту по номеру контракта</h2>}
        >
            <Head title="Получить почту по номеру контракта" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-4 gap-4">
                                <TextInput
                                    value={number}
                                    name={'Номер документа'}
                                    handleChange={(e)=>{console.log(e.target.value)
                                        setNumber(e.target.value);
                                    }}
                                />
                                <PrimaryButton
                                    onClick={getEmailByNumber}
                                >
                                    Получить список emails
                                </PrimaryButton>
                                {
                                    listEmails.length !== 0 ? (
                                        <PrimaryButton
                                            onClick={() => {navigator.clipboard.writeText(listEmails.toString())}}
                                        >
                                            Ctrl + C
                                        </PrimaryButton>
                                    ) : null
                                }
                            </div>
                            {
                                listEmails.length !== 0 ? (
                                    <table class="table-auto">
                                        <thead>
                                        <tr>
                                            <th>Emails</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listEmails.map((email) => {
                                            return (<tr><td>{email.email}</td></tr>);
                                        })}
                                        </tbody>
                                    </table>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
