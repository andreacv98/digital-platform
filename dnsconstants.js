const digitalplatform_dns = "digitalplatform.ddns.net"
const digitalplatform_port = "443"

const inps_dns = "fakeinps.ddns.net"
const inps_port = "443"

const provider_dns = "cieprovider.ddns.net"
const provider_port = "443"



const digitalplatform = {
    dns : digitalplatform_dns,
    url : "https://"+digitalplatform_dns,
    port : digitalplatform_port,
    site : "https://"+digitalplatform_dns+":"+digitalplatform_port,
    client_id: 'digitalPlatformClient',
    client_secret: 'Some_super_secret',
    redirect_uris: ["https://"+digitalplatform_dns+":"+digitalplatform_port+"/login/callback"],
}

const inps = {
    dns : inps_dns,
    url : "https://"+inps_dns,
    port : inps_port,
    site : "https://"+inps_dns+":"+inps_port,
    client_id: 'inpsClient',
    client_secret: 'Some_super_secret',
    redirect_uris: ["https://"+inps_dns+":"+inps_port+"/login/callback"],
}

const provider = {
    dns : provider_dns,
    url : "https://"+provider_dns,
    port : provider_port,
    site : "https://"+provider_dns+":"+provider_port,
}

module.exports= {
    digitalplatform,
    inps,
    provider
}



