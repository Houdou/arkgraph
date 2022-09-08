import { MATERIALS } from '../../models/Resources';

const convert = (items) => {
    const stock = {};
    items.forEach(r => {
        const {
            id, have, name
        } = r;
        const item = MATERIALS.find(m => String(m.unique_id) === String(id) || m.name === name);
        if (item && have > 0) {
            stock[item.id] = Number(have);
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