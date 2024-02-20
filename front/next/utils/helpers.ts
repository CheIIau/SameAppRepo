export function checkRouteMatch(link: string, currentRoute: string) {
    const regexp = /^\/([^/]+\/[^/]+)(\/.*)?$/
    const routeWithoutParams = currentRoute.replace(regexp, '')
    const linkWithoutParams = link.replace(regexp, '')
    return routeWithoutParams === linkWithoutParams
}
