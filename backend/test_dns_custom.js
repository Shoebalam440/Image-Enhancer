const dns = require('dns');

try {
    dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS
    console.log('DNS servers set to Google DNS (8.8.8.8, 8.8.4.4)');
} catch (e) {
    console.error('Error setting DNS servers:', e.message);
}

const host = 'cluster0-shard-00-00.m9jpcjz.mongodb.net';

console.log(`Resolving ${host}...`);
dns.resolve4(host, (err, addresses) => {
    if (err) {
        console.error('DNS Resolution failed:', err.code, err.message);
    } else {
        console.log(`Success! Resolved ${host} to:`, addresses);
    }
});
