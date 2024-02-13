<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Customer Data</title>
    <style>
        /* Define styles for the PDF document */
        body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1>Customer Data</h1>
    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th>No. HP</th>
                <th>Alamat</th>
                <th>Paket</th>
                <th>Nama Paket</th>
                <th>Harga</th>
            </tr>
        </thead>
        <tbody>
            @foreach($customers as $customer)
            <tr>
                <td>{{ $customer['Nama'] }}</td>
                <td>{{ $customer['No. HP'] }}</td>
                <td>{{ $customer['Alamat'] }}</td>
                <td>{{ $customer['Paket'] }}</td>
                <td>{{ $customer['Nama Paket'] }}</td>
                <td>{{ $customer['Harga'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
