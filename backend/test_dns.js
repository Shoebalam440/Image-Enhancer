const dns = require('dns');

const host = 'cluster0-shard-00-00.m9jpcjz.mongodb.net';

console.log(`Resolving ${host}...`);
dns.lookup(host, (err, address, family) => {
    if (err) {
        console.error('DNS Lookup failed:', err);
    } else {
        console.log(`Resolved ${host} to ${address} (IPv${family})`);
    }
});
