module.exports = {
    newSchema: function () {
        return {
            "name": {
            },
            "picture": null,
            "company": {
            },
            "emails": [
            ],
            "phones": [
            ],
            "addresses": [
            ],
            "urls": [
            ],
            "dates": [
            ],
            withName : function(first, last) {
                this.name.first = first;
                this.name.last = last;
                return this;
            },
            withFullName : function(prefix, first, middle, last, suffix) {
                this.name.first = first;
                this.name.last = last;
                this.name.prefix = prefix;
                this.name.suffix = suffix;
                this.name.middle = middle;
                return this;
            },
            withPicture : function(pic) {
                this.picture = pic;
                return this;
            },
            withCompany : function(name, title) {
                this.company.name = name;
                this.company.title = title;
            },
            addEmail : function(tag, email) {
                this.emails.push({tag : tag, email : email});
                return this;
            },
            addPhone : function(tag, phone) {
                this.phones.push({tag : tag, phone : phone});
                return this;
            },
            addURL : function(tag, url) {
                this.urls.push({tag : tag, url : url});
                return this;
            },
            addDate : function(tag, date) {
                this.dates.push({tag : tag, date : date});
                return this;
            },
            addAddress : function(tag, address, neighborhood, city, region, country, postalCode) {
                this.addresses.push({tag : tag, address : address, neighborhood : neighborhood, city : city, region : region, country : country, postalCode : postalCode});
                return this;
            }
        };
    }
};