const TAG_NAME = "outerdocs";

const LINK_SOURCES = {}
const LINKS = []


function getURLend(s, name) {

}

exports.handlers = {
    newDoclet: function(doclet, deps) {
        doclet = doclet.doclet;
        doclet.description += "<b>HI</b>"
        if(doclet.tags) {
            for(let tag of doclet.tags) {
                if(tag.title == TAG_NAME) {
                    if(doclet.kind == "external") {
                        if(!LINK_SOURCES[doclet.name]) {
                            LINK_SOURCES[doclet.name] = {
                                url: tag.value,
                                links: []
                            };
                        } else {
                            LINK_SOURCES[doclet.name].url = tag.value;
                        }
                    } else {
                        if(!LINK_SOURCES[tag.value]) {
                            LINK_SOURCES[tag.value] = {
                                links: [doclet]
                            }
                        } else {
                            LINK_SOURCES[tag.value].links.push(doclet);
                        }
                    }
                }
            }
        }
    },
    beforeParse: function(a,b) {
        console.log('before parse', b)
    },
    parseComplete: function(sourceFiles, doclets) {
        console.log('parse complete...', LINK_SOURCES);
        for(let key of Object.keys(LINK_SOURCES)) {
            let linkSource = LINK_SOURCES[key];
            for(let link of linkSource.links) {
                //console.log(key, link);
            }
            //console.log(LINK_SOURCES[key]);
        }
    }
}