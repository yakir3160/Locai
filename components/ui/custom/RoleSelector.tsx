import React, { useState } from 'react';

const roles = [
    'career coach',
    'ats expert',
    'general tech interviewer',
    'frontend interviewer'
];

export const RoleSelector: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<string>(roles[0]);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = async () => {
        const response = await fetch('/api/chat/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: selectedRole, messages: [] })
        });

        if (!response.ok) {
            console.error('Failed to send role to API');
        }
    };

    return (
        <div className="role-selector">
            <select value={selectedRole} onChange={handleRoleChange}>
                {roles.map(role => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
