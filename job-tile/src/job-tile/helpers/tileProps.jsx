import { parse } from 'url';
import gadgets from 'jive/gadgets';

const urlParams = parse(gadgets.util.getUrlParameters().url, true);
const { syn_app } = urlParams.query;
const tileId = urlParams.query['ref_' + syn_app].split(':')[1];

const pathChunks = urlParams.pathname.split('/');
pathChunks.pop();
const tilePath = pathChunks.join('/');

export { tileId, tilePath, urlParams }
