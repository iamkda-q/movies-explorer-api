const linkRegExp = /^https?:\/\/(www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]+[a-zA-Z0-9])|([a-zA-Z0-9]*)\.)+[a-zA-Z]{2,}(\/[\w.+@:_'~,-=#;!&[\]/$|?*()]+)*$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = { linkRegExp, emailRegExp };
