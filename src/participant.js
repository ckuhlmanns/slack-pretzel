const participants =
    Array(
        {
            alias: 'cku',
            user: 'U01TCUYHAMS',
            emoji: ':tomato:'
        },
        {
            alias: 'another-alias',
            user: 'another-user',
            emoji: ':broccoli:'
        },
        {
            alias: 'other-alias',
            user: 'other-user',
            emoji: ':banana:'
        }
    )

export function getOtherThanUser(current) {
    let others = participants.filter(u => u.user != current)
    return others[Math.floor(Math.random() * others.length)]
}