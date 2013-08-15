var Closed_Positions = new Array()

/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    if ( (name.length > 0) & (typeof (position[0]) == 'number') & (typeof (position[1]) == 'number') & (typeof (capacity) == 'number') ){
        this.name     = name
        this.position = position
        this.capacity = capacity
        this.loaded   = 0 // загружено на корабль
    }
    else{ document.getElementById('start').innerHTML+='<p>Ошибка! Невозможно создать корабль!</p>' }



};

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var report = this.name+'. Местоположение: '+ this.position+'. Занято '+this.loaded+' из '+ this.capacity+'т.'
    document.getElementById('start').innerHTML+='<p>'+report+'</p>'

};

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () { return this.capacity - this.loaded };

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () { return this.loaded };

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) { this.position = newPosition };

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    if ( (name.length > 0) & (typeof (position[0]) == 'number') &
       ( typeof (position[1]) == 'number') & (typeof (availableAmountOfCargo) == 'number') &
       ( Closed_Positions.indexOf(position) == -1 ) ){
        this.name   = name
        this.position = position
        this.availableCargo = availableAmountOfCargo
        Closed_Positions.push(position)
    }
    else{ document.getElementById('start').innerHTML+='<p>Ошибка! Невозможно создать планету!</p>' }

};

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    var report = this.name+'. Местоположение: '+this.position+'. '
    if (this.availableCargo == 0) { report+= 'Грузов нет.' }
    else { report += 'Доступно груза: ' + this.availableCargo + 'т.' }
    document.getElementById('start').innerHTML+='<p>'+report+'</p>'
};

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {return this.availableCargo };

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  vessel.position = this.position
  if (cargoWeight <=vessel.capacity & cargoWeight <= vessel.getFreeSpace()){
      vessel.loaded = cargoWeight
      this.availableCargo -= cargoWeight
  }
  else{ document.getElementById('start').innerHTML+='<p>Ошибка! Грузоподъемность мала!</p>' }
};

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    vessel.position = this.position
    if (cargoWeight <= vessel.loaded){
        vessel.loaded-= cargoWeight
        this.availableCargo += cargoWeight
    }
    else{ document.getElementById('start').innerHTML+='<p>Ошибка! Недостаточное количество груза на корабле!</p>' }
};

function start(){
    var vessel  = new Vessel('Яндекс', [0,0], 1000);
    var planetA = new Planet('A', [0,0], 0);
    var planetB = new Planet('B', [100, 100], 5000);

    vessel.report()
    planetA.report()
    planetB.report()

    vessel.flyTo(planetB);
    planetB.loadCargoTo(vessel, 1000);
    vessel.report();

    vessel.flyTo(planetA);
    planetA.unloadCargoFrom(vessel, 500);
    vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
    planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
    planetB.report();
}