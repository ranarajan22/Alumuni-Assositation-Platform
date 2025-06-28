import React from 'react';

function Students() {
    const dummyStudents = [
        { id: 1, name: 'RAJAN', email: '22cse211.rajankumarrana@giet.edu', graduationYear: 2026 },
        { id: 2, name: 'Debesh', email: '22cse085.debeshkumarbehera@giet.edu', graduationYear: 2026 },
        { id: 3, name: 'Anisha', email: '22cse137.rajankumarrana@giet.edu', graduationYear: 2026 },
        { id: 3, name: 'Anisha Minz', email: '22cse137.anishaminz@giet.edu.edu', graduationYear: 2026 },
        { id: 3, name: 'Kumar yash', email: '21cse226.kumaryash@giet.edu', graduationYear: 2025 },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-4">Students</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="border border-gray-300 py-2 px-4">ID</th>
                        <th className="border border-gray-300 py-2 px-4">Name</th>
                        <th className="border border-gray-300 py-2 px-4">Email</th>
                        <th className="border border-gray-300 py-2 px-4">Graduation Year</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyStudents.map((student) => (
                        <tr key={student.id} className="text-center">
                            <td className="border border-gray-300 py-2 px-4">{student.id}</td>
                            <td className="border border-gray-300 py-2 px-4">{student.name}</td>
                            <td className="border border-gray-300 py-2 px-4">{student.email}</td>
                            <td className="border border-gray-300 py-2 px-4">{student.graduationYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Students;
