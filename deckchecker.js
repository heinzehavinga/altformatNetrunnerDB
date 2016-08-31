class DeckChecker {
    constructor(uiChange) {
        this.formats = [];
        this.formatsErrors = [];
        this.cards = new Object();
        this.packList = [];
        this.cycles = [];
        this.types = [];
        this.factions = [];
        this.checkDeckAuto(uiChange);
    }
    checkDeckAuto(uiChange) {
            var _parent = this;
            //TODO: multiple formats
            chrome.storage.local.get("formats", function (obj) {
                //Load format, if no format are availible, two example formats are loaded    
                if (jQuery.isEmptyObject(obj)) {
                    _parent.formats = [example, example2];
                    chrome.storage.local.set({
                        'formats': _parent.formats
                    });
                }
                else {
                    _parent.formats = obj.formats;
                }
                //Load cards, if cardList is old, make API call
                _parent.getCardList(uiChange);
            });
        }
        //Check the currect deck with the active format type.
    checkDeck() {
        var _parent = this;
        //TODO: multiple formats
        //Check the cards in the current deck
        $.each(_parent.formats, function (indexFormat, format) {
            _parent.formatsErrors[indexFormat] = new Object();
            _parent.formatsErrors[indexFormat].wildcards = [];
            $.each(format.exceptions.exemptedWildCards, function (index, value) {
                _parent.formatsErrors[indexFormat].wildcards.push({
                    "uniqueCards": value.uniqueCards
                    , "amountofCards": value.amountofCards
                })
            })
            var formatErrors = _parent.formatsErrors[indexFormat];
            formatErrors.mgs = [];
            formatErrors.usedDataPacks = [];
            formatErrors.usedBigPacks = [];
            formatErrors.deckCards = [];
            $("#deck-content .card, #identity .card").each(function (index, value) {
                var card = new Object();
                card.name = $(value).attr("data-index");
                if ($(value).attr("id") == "identity") {
                    card.amount = 1;
                }
                else {
                    var cardString = $(value).parent().text();
                    var amountLength = cardString.indexOf("x");
                    card.amount = cardString.substr(0, amountLength);
                }
                var result = new Object();
                result = _parent.exemptedCheck(_parent.cards, card, format, result);
                if (result.valid == undefined) {
                    var result = _parent.checkCard(_parent.cards, card, format);
                    if (!result.valid) {
                        card.error = true;
                        card.message = result.message;
                    }
                    var pack_code = _parent.cards[card.name].pack_code;
                    if (pack_code in _parent.packList) {
                        if ($.inArray(pack_code, formatErrors.usedDataPacks) == -1 && $.inArray(pack_code, formatErrors.usedBigPacks) == -1 && pack_code != "core") {
                            if (_parent.packList[pack_code].type == "small") {
                                if ($.inArray(pack_code, formatErrors.usedDataPacks) == -1) {
                                    formatErrors.usedDataPacks.push(pack_code);
                                    if (formatErrors.usedDataPacks.length > format.rules.allowedUniqueDataPacks && format.rules.allowedUniqueDataPacks > -1) {
                                        var wildCardCheck = _parent.handleWildcard(card, _parent.formatsErrors[indexFormat].wildcards);
                                        if (wildCardCheck[0]) {
                                            card.error = false;
                                            card.message = wildCardCheck[1];
                                            formatErrors.usedDataPacks.splice(formatErrors.usedDataPacks.length - 1, 1);
                                        }
                                        else {
                                            formatErrors.mgs[0] = formatErrors.usedDataPacks.length + " datapacks used, only " + format.rules.allowedUniqueDataPacks + " allowed!";
                                        }
                                    }
                                }
                            }
                            else {
                                if ($.inArray(pack_code, formatErrors.usedBigPacks) == -1) {
                                    formatErrors.usedBigPacks.push(pack_code);
                                    if (formatErrors.usedBigPacks.length > format.rules.allowedUniqueBigPacks && format.rules.allowedUniqueBigPacks > -1) {
                                        var wildCardCheck = _parent.handleWildcard(card, _parent.formatsErrors[indexFormat].wildcards);
                                        if (wildCardCheck[0]) {
                                            card.error = false;
                                            card.message = wildCardCheck[1];
                                            formatErrors.usedBigPacks.splice(formatErrors.usedBigPacks.length - 1, 1);
                                        }
                                        else {
                                            formatErrors.mgs[1] = formatErrors.usedBigPacks.length + " big expansions used, only " + format.rules.allowedUniqueBigPacks + " allowed!";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        card.error = true;
                        card.message = pack_code + ": unknown pack";
                    }
                }
                formatErrors.deckCards.push(card);
            });
            //trigger function for showing messages and check
            $.each(formatErrors.deckCards, function (index, card) {
                if (card.error) {
                    var wildCardCheck = _parent.handleWildcard(card, _parent.formatsErrors[indexFormat].wildcards);
                    if (wildCardCheck[0]) {
                        card.error = false;
                        card.message = wildCardCheck[1];
                    }
                    else {
                        formatErrors.mgs.push(card.message);
                    }
                }
                else if (card.error === false) {}
            })
        })
    }
    handleWildcard(card, wildCards) {
        //check how many
        //check amount of card
        //find wildcard closest to this card
        var closestIndex = -1;
        for (var i = 0; i < wildCards.length; i++) {
            if (wildCards[i].amountofCards == card.amount) {
                closestIndex = i;
                break;
            }
            else if (wildCards[i].amountofCards > card.amount) {
                closestIndex = i;
            }
        }
        if (closestIndex > -1) {
            wildCards[closestIndex].uniqueCards = -1;
            if (wildCards[closestIndex].uniqueCards <= 0) {
                wildCards.splice(closestIndex, 1);
            }
            return [true, "this is one of your wildcards"];
        }
        else {
            return [false, ""];
        }
    }
    exemptedCheck(cardList, card, format, result) {
            //exempted factions
            var id_card = card.name;
            if ($.inArray(cardList[id_card].faction_code, format.exceptions.exemptedCards) != -1) {
                result.valid = true;
                return result;
            }
            //exempted packs
            if ($.inArray(cardList[id_card].pack_code, format.exceptions.exemptedPackCodes) != -1) {
                result.valid = true;
                return result;
            }
            //exempted types
            if ($.inArray(cardList[id_card].type_code, format.exceptions.exemptedTypeCodes) != -1) {
                result.valid = true;
                return result;
            }
            //exempted cards
            if ($.inArray(id_card, format.exceptions.exemptedCards) != -1) {
                result.valid = true;
                return result;
            }
            return result;
        }
        //Function to check a signel card
    checkCard(cardList, card, format) {
        var result = new Object();
        var id_card = card.name;
        var cardTitle = cardList[id_card].title;
        //Allowed quantities
        if (cardList[id_card].pack_code == "core") {
            var quantity = format.rules.allowedCores * cardList[id_card].quantity;
            if (quantity > 3) {
                quantity = 3;
            }
            if (card.amount > quantity) {
                result.valid = false;
                result.message = cardTitle + ": Just " + format.rules.allowedCores + " coreset(s) allowed";
                return result;
            }
        }
        if ($.inArray(id_card, format.rules.forbiddenCards) != -1) {
            result.valid = false;
            result.message = cardTitle + ": Card isn't allowed";
            return result;
        }
        //Check ID factions
        if (cardList[id_card].type_code == "identity") {
            if ($.inArray("*", format.rules.allowedIDFactions) == -1) {
                if ($.inArray(cardList[id_card].faction_code, format.rules.allowedIDFactions) == -1) {
                    result.valid = false;
                    result.message = cardTitle + ": Identity isn't allowed";
                    return result;
                }
            }
        }
        //Check cycle
        if ($.inArray("*", format.rules.allowedCylces) == -1) {
            if ($.inArray(this.packList[cardList[id_card].pack_code].cycle_code, format.rules.allowedCylces) == -1) {
                result.valid = false;
                result.message = cardTitle + ": Cards from this cycle aren't allowed";
                return result;
            }
        }
        //Check card factions
        if ($.inArray("*", format.rules.allowedCardFactions) == -1) {
            if ($.inArray(cardList[id_card].faction_code, format.rules.allowedCardFactions) == -1) {
                result.valid = false;
                result.message = cardTitle + ": Cards from this faction aren't allowed";
                return result;
            }
        }
        //Check pack
        if ($.inArray("*", format.rules.allowedPacks) == -1) {
            if ($.inArray(cardList[id_card].pack_code, format.rules.allowedPacks) == -1) {
                result.valid = false;
                result.message = cardTitle + ": Data-pack isn't allowed";
                return result;
            }
        }
        result.valid = true;
        return result;
    }
    getCardList(uiChange) {
            var _parent = this;
            //Check if the last list update is older than 48 hours.
            //Load the new list
            chrome.storage.local.get("cardListUpdate", function (obj) {
                var now = new Date();
                var lastUpdate = obj.cardListUpdate;
                if (typeof (lastUpdate) == "number") {
                    var timeDiff = Math.abs(now.getTime() - lastUpdate);
                    if (timeDiff > 1728000) {
                        _parent.updateCardList(uiChange);
                    }
                    else {
                        chrome.storage.local.get("cardList", function (obj) {
                            $.each(obj.cardList, function (index, value) {
                                _parent.cards[value.code] = value;
                                if ($.inArray(value.faction_code, _parent.factions) == -1) {
                                    _parent.factions.push(value.faction_code);
                                }
                                if ($.inArray(value.type_code, _parent.types) == -1) {
                                    _parent.types.push(value.type_code);
                                }
                            })
                            _parent.cards = obj.cardList;
                            _parent.getPackList(uiChange);
                        })
                    }
                }
                else {
                    _parent.updateCardList(uiChange);
                }
            });
        }
        //update the card list   
    updateCardList(uiChange) {
            var _parent = this;
            //Get the cardList from NetrunnerDB and add it to
            //localStorage
            var jqxhr = $.getJSON("https://netrunnerdb.com/api/2.0/public/cards", function (data) {
                //Je wil het opslaan per id dus
                $.each(data.data, function (index, value) {
                    _parent.cards[value.code] = value;
                    if ($.inArray(value.faction_code, _parent.factions) == -1) {
                        _parent.factions.push(value.faction_code)
                    }
                    if ($.inArray(value.type_code, _parent.types) == -1) {
                        _parent.types.push(value.type_code)
                    }
                })
                chrome.storage.local.set({
                    'cardList': _parent.cards
                }, function () {
                    // Notify that we saved.
                    var now = new Date;
                    chrome.storage.local.set({
                        'cardListUpdate': now.getTime()
                    }, function () {})
                    _parent.getPackList(uiChange);
                });
            }).fail(function () {})
        }
        //get the currect packlist
    getPackList(uiChange) {
            var _parent = this;
            //Check if the last list update is older than 48 hours.
            //Load the new list
            chrome.storage.local.get("packListUpdate", function (obj) {
                var now = new Date();
                var lastUpdate = obj.cardListUpdate;
                if (typeof (lastUpdate) == "number") {
                    var timeDiff = Math.abs(now.getTime() - lastUpdate);
                    if (timeDiff > 1728000) {
                        _parent.updatePackList(uiChange);
                    }
                    else {
                        chrome.storage.local.get("packList", function (obj) {
                            _parent.packList = obj.packList;
                            $.each(_parent.packList, function (index, value) {
                                if ($.inArray(value.cycle_code, _parent.cycles) == -1) {
                                    _parent.cycles.push(value.cycle_code)
                                }
                                if (packListCount[value.code] == undefined) {
                                    packListCount[value.cycle_code] = 1;
                                }
                                else {
                                    packListCount[value.cycle_code] += 1;
                                }
                            })
                            _parent.checkDeck();
                            uiChange(_parent.formats, _parent.formatsErrors);
                        })
                    }
                }
                else {
                    _parent.updatePackList(uiChange);
                }
            });
        }
        //update the pack list       
    updatePackList(uiChange) {
            var _parent = this;
            //Get the cardList from NetrunnerDB and add it to localStorage
            var packListCount = new Object();
            var packList = new Object();
            var cycleListCount = new Object();
            var jqxhr = $.getJSON("https://netrunnerdb.com/api/2.0/public/packs", function (data) {
                var packData = data.data;
                $.each(packData, function (index, value) {
                    packList[value.code] = new Object();
                    packList[value.code]['name'] = value.name;
                    packList[value.code]['cycle_code'] = value.cycle_code;
                    packList[value.code]['size'] = value.size;
                    if ($.inArray(value.cycle_code, _parent.cycles) == -1) {
                        _parent.cycles.push(value.cycle_code)
                    }
                    if (packListCount[value.code] == undefined) {
                        packListCount[value.cycle_code] = 1;
                    }
                    else {
                        packListCount[value.cycle_code] += 1;
                    }
                })
                $.each(packList, function (index, value) {
                    //Doing some arbetrairy check to see if it's a big expansion, there is no sure fire way to tell.
                    if (packListCount[value.cycle_code] == 1 && value.size > 30) {
                        packList[index].type = "big";
                    }
                    else {
                        packList[index].type = "small";
                    }
                })
                _parent.packList = packList;
                chrome.storage.local.set({
                    'packList': _parent.packList
                }, function () {
                    // Notify that we saved.
                    _parent.checkDeck();
                    uiChange(_parent.formats, _parent.formatsErrors);
                    var now = new Date;
                    chrome.storage.local.set({
                        'packListUpdate': now.getTime()
                    }, function () {})
                });
            }).fail(function () {})
        }
        //Save the current Format type rules and exceptions
        //Add it to the local storage
        //Export a Format into a JSON string
    exportFormat(index) {
            return JSON.stringify(this.formats[index]);
        }
        //delete format
    deleteFormat(index) {
            this.formats.splice(index, 1);
            this.formatsErrors.splice(index, 1);
            chrome.storage.local.set({
                'formats': this.formats
            });
        }
        //Import a Format using JSON string
    importFormat(newFormat, callback) {
        var _parent = this;
        this.formats.push(newFormat);
        chrome.storage.local.set({
            'formats': this.formats
        }, function () {
            callback();
            chrome.storage.local.get("formats", function (obj) {});
        });
    }
    getFormats() {
        return this.formats;
    }
    getPackCode(packs) {
        var _parent = this;
        var codes = [];
        $.each(_parent.packList, function (key, value) {
            if ($.inArray(value.name, packs) != -1) {
                codes.push(key);
                //                return false;
            }
        })
        return codes;
    }
    getCardIds(names) {
        var ids = [];
        $.each(this.cards, function (index, value) {
            if ($.inArray(value.title, names) != -1) {
                ids.push(value.code);
                //                return false;
            }
        })
        return ids;
    }
    getPackNames(codes) {
        var _parent = this;
        var names = [];
        $.each(_parent.packList, function (key, value) {
            if ($.inArray(key, codes) != -1) {
                names.push(value.name);
                //                return false;
            }
        })
        return names;
    }
    getCardNames(ids) {
        var _parent = this;
        var names = [];
        $.each(_parent.cards, function (key, value) {
            if ($.inArray(key, ids) != -1) {
                names.push(value.title);
                //                return false;
            }
        })
        return names;
    }
}