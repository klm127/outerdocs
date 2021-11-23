const TAG_NAME = "outerdocs";

function getLinkName(tagValue) {
    let firstDotIndex = tagValue.indexOf('.');
    if(firstDotIndex >= 0) {
        return tagValue.substr(0, firstDotIndex);
    }
    else {
        return tagValue;
    }
}

function getIdLink(tagValue) {
    let poundIndex = tagValue.indexOf('#');
    if(poundIndex < 0) {
        return {
            id: '',
            linkBase: tagValue
        }
    }
    else {
        return {
            linkBase: tagValue.substr(0, poundIndex),
            id: tagValue.substr(poundIndex)
        }
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
                        let idParse = getIdLink(workingValue)
                        workingValue = idParse.linkBase;

                        if(linkConfig.dropFirst) {
                            workingValue = workingValue.replace(linkName+".", "");
                            if(workingValue == linkName) {
                                workingValue = "";
                            }
                        }

                        //dots or slashes
                        if(linkConfig.structure == "dots") {
                            appendHTML += workingValue;
                        }
                        else if(linkConfig.structure == "slashes"){
                            workingValue = workingValue.replaceAll('.','/')
                        }

                        //append html or not
                        if(linkConfig.appendhtml) {
                            workingValue += ".html";
                        }

                        
                        let fullURL = linkConfig.url + workingValue + idParse.id;
                        if(!doclet.see) {
                            doclet.see = [];
                        }
                        doclet.see.push(`{@link ${fullURL} ${tag.value}}`);
                    }
                }
            }
        }
    })
};
