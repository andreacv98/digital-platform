const digitalplatform = {
    dns : 'digitalplatform.ddns.net',
    url : 'https://digitalplatform.ddns.net',
    port : 443,
    site : 'https://digitalplatform.ddns.net:443',
    client_id: 'digitalPlatformClient',
    client_secret: 'Some_super_secret',
    redirect_uris: ["https://digitalplatform.ddns.net:443/login/callback"],
}

const inps = {
    dns : 'fakeinps.ddns.net',
    url : 'https://fakeinps.ddns.net',
    port : 443,
    site : 'https://fakeinps.ddns.net:443',
    client_id: 'inpsClient',
    client_secret: 'Some_super_secret',
    redirect_uris: ["https://fakeinps.ddns.net:443/login/callback"],
}

const provider = {
    dns : 'cieprovider.ddns.net',
    url : 'https://cieprovider.ddns.net',
    port : 443,
    site : 'https://cieprovider.ddns.net:443',
}

module.exports= {
    digitalplatform,
    inps,
    provider
}



