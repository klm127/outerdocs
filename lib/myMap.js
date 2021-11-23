/**
 * @description Does something more than a map does
 * @outerdocs BuiltIn.Map
 * @extends BuiltIn.Map
 * @memberof ExtendedBuiltIns
 */
class myMap extends Map{

    /**
     * @override
     * @outerdocs BuiltIn.Map.clear
     */
    clear() {
        super.clear();
        console.log('the custom map was cleared!');

    }

}