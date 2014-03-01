module.exports = {
    newSchema : function() {
        return {
            "fields" : [],
            addField : function(name, value) {
                this.fields.push({name : name, value : value});
                return this;
            }
        };
    }
};