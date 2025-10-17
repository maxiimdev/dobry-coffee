export default (context, inject) => {
    const cities = [
        { id: '60f197849998570020506123', title: 'Оренбург' },
        { id: '60f197849998570020506124', title: 'Москва' },
        { id: '60f197849998570020506125', title: 'Санкт-Петербург' },
        { id: '60f197849998570020506126', title: 'Казань' },
        { id: '60f197849998570020506127', title: 'Екатеринбург' },
        { id: '60f197849998570020506128', title: 'Новосибирск' },
    ]

    const names = [
        'Галина',
        'Марина',
        'Иван',
        'Светлана',
        'Андрей',
        'Олег',
        'Анна',
        'Наталья',
        'Роман',
        'Елена',
    ]

    function randomPhone() {
        const rand = Math.floor(1000000 + Math.random() * 9000000)
        return `+79*****${rand.toString().slice(-4)}`
    }

    function randomDate(from, to) {
        return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())).getTime()
    }

    function generateUser(id) {
        const city = cities[Math.floor(Math.random() * cities.length)]
        const name = names[Math.floor(Math.random() * names.length)]
        return {
            id: String(id).padStart(24, '0'),
            balance: Math.floor(Math.random() * 1000),
            cashbackPercent: [5, 10, 15][Math.floor(Math.random() * 3)],
            city,
            isBlocked: Math.random() < 0.05,
            lastSave: randomDate(new Date(2023, 0, 1), new Date()),
            lastSpend: randomDate(new Date(2023, 0, 1), new Date()),
            lastVisit: randomDate(new Date(2023, 0, 1), new Date()),
            name,
            phone: randomPhone(),
            role: 'customer',
            saveCount: Math.floor(Math.random() * 100),
            saveTotal: Math.floor(Math.random() * 1000),
            spendCount: Math.floor(Math.random() * 50),
            spendTotal: Math.floor(Math.random() * 1000),
            updatedAt: Date.now(),
            createdAt: randomDate(new Date(2023, 0, 1), new Date()),
        }
    }

    const users = {
        async list({ offset = 0, limit = 100 }) {
            if (limit > 500) limit = 500

            await new Promise(res => setTimeout(res, 500))

            const data = []
            for (let i = 0; i < limit; i++) {
                const id = offset + i + 1
                data.push(generateUser(id))
            }
            return data
        },
    }

    inject('api', { users })
}
