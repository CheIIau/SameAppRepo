export const getRightSideUrl = /^\/([^/]+\/[^/]+)(\/.*)?$/

export function checkRouteMatch(link: string, currentRoute: string) {
    const routeWithoutParams = currentRoute.replace(getRightSideUrl, '')
    const linkWithoutParams = link.replace(getRightSideUrl, '')
    return routeWithoutParams === linkWithoutParams
}
