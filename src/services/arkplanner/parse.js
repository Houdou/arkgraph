import { RESOURCES } from '../../models/Resources';

const convert = (items) => {
    const stock = {};
    items.forEach(r => {
        const {
            id, have, name
        } = r;
        const item = Object.entries(RESOURCES).find(
            ([rid, m]) => String(m.unique_id) === String(id) || m.name === name || rid === String(id)
        );
        if (item && have > 0) {
            stock[item[1].id] = Number(have);
        }
    });

    return stock;
}

const parse = (raw) => {
    try {
        const data = JSON.parse(raw);
        if (data.items) {
            return convert(data.items);
        }
        if (data && data.length > 0) {
            return convert(data);
        }
        return {}
    } catch (err) {
        console.warn(err);
    }
};

export default parse;