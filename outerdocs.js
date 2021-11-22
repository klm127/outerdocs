const TAG_NAME = "outerdocs";

const LINKS = []

function getLinkName(tagValue) {
    let firstDotIndex = tagValue.indexOf('.');
    if(firstDotIndex >= 0) {
        return tagValue.substr(0, firstDotIndex);
    }
    else {
        return tagValue;
    }
}


exports.defineTags = function(dictionary,b) {
    dictionary.defineTag(TAG_NAME, {
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
            // get the outder docs config
            let config = env.conf[TAG_NAME];
            if(config) {
                let linkName = getLinkName(tag.value);
                let linkConfig = config[linkName];
                if(linkConfig) {
                    if(linkConfig.url) {
                        let appendHTML = "";
                        let workingValue = tag.value;

                        if(linkConfig.dropFirst) {
                            workingValue = workingValue.replace(linkName+".", "");
                        }

                        //dots or slashes
                        if(linkConfig.structure == "dots") {
                            appendHTML += workingValue;
                        }
                        else if(linkConfig.structure == "slashes"){
                            workingValue = workingValue.replaceAll('.','/')
                        }

                        //append html or not
                        if(linkConfig.appendHTML) {
                            workingValue += ".html";
                        }

                        
                        let fullURL = linkConfig.url + workingValue;
                        if(!doclet.see) {
                            doclet.see = [];
                        }
                        doclet.see.push(`{@link ${fullURL} ${tag.value}}`);
                        LINKS.push(doclet);
                    }
                }
            }
        }
    })
};

exports.handlers = {
    processingComplete: function() {
        console.log(Object.keys(this))
        console.log(this._visitor);
    }
}
