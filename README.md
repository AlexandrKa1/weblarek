# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Модели данных

В ходе анализа проекта было установлено: в приложении используются две сущности, которые описывают данные, — товар и покупатель. Их можно описать такими интерфейсами:
Товар (interface IProduct)
Используется для учета товаров, используемых в приложении.
Структура: interface IProduct { id: string; description: string; image: string; title: string; category: string; price: number | null; }
Покупатель (interface IBuyer)
Используется для получения данных, необходимых для оформления заказа.
Структура: interface IBuyer { payment: TPayment; email: string; phone: string; address: string; }

Модель данных
Класс Catalog
хранение товаров, которые можно купить в приложении;

Конструктор: constructor(products: IProduct[] = []) - В конструктор можно передать массив объектов IProduct[], если не будет передан, products становится незаполненным массивом

Поля класса: products: IProduct - хранит массив товаров selectedProduct - хранит выбранную карточку

Методы класса: setProducts(products: IProducts[]) - принимает на вход массив объектов с интерфейсом IProducts[] и записывает из в поле класса products; getProducts(): IProduct[] - получение массива товаров из поля products; getProductById(productId: string): IProduct | undefined - принимает на вход id продукта, осуществляет поиск в массве products. При нахождении продукта, возвращает его, иначе undefined. setSelectedProduct(product: IProduct): void - сохраняет товар для подробного отображения в selectedProduct; getSelectedProduct(): IProduct | null - получение товара для подробного отображения из selectedProduct или вохвращает null;

Класс Cart
хранение товаров, которые пользователь выбрал для покупки;

Конструктор: constructor() - создает пустую корзину

Поля класса: products: IProduct[] - массив продуктов, добавленных в корзину

Методы класса getCartProducts(): IProduct[] | null - получение массива товаров, которые находятся в корзине; addToCart(product: IProduct) - добавление товара, который был получен в параметре, в массив корзины; removeFromCart(product: IProduct) - удаление товара, полученного в параметре из массива корзины; clearCart() - очистка корзины; getTotalPrice(): number  - получение стоимости всех товаров в корзине; getTotalCount(): number  - получение количества товаров в корзине; hasProduct(productId: string): boolean - проверка наличия товара в корзине по его id, полученного в параметр метода.

Класс Castomer
данные покупателя, которые тот должен указать при оформлении заказа.

Конструктор:

Поля класса:

payment: ICustomer["payment"] = "" - хранит выбранный способ оплаты
address: string | null = null - хранит введенный адрес
email: string | null = null - хранит введенный email
phone: string | null = null - хранит введенный номер телефона
Методы класса: setPayment(payment: ICustomer["payment"]): void - записывает выбранный способ оплаты; setAddress(address: string | null): void - записывает введенный адресж setEmail(email: string | null): void - записывает введенный email; setPhone(phone: string | null): void- записывает введенный номер телефона;

getData(): ICustomer - получение всех данных покупателя; clear(): void- очистка данных покупателя; validation(): CustomerError - валидация данных. Проверяет заполнено ли валидируемое поле и не является ли оно пустым;

### Слой коммуникации
Слой коммуникации отвечает за обмен данными с сервером «Веб-ларёк»: получение списка товаров и отправка данных заказа.
Класс WebLarekApi
Выполняет запросы к серверу и возвращает данные. Класс использует экземпляр Api как зависимость (композиция), а не наследуется от него. WebLarekApi вызывает методы Api (get и post) для выполнения запросов.
Конструктор класса: constructor(api: Api) — принимает и записывает в переменную api экземпляр класса Api, который уже настроен на API_ORIGIN.
Поля класса:

    api: Api — экземпляр класса Api, через который выполняются запросы.

Методы класса:

    getProducts(): Promise<TGetProducts> — получает Promise с объектом типа TGetProducts, содержащий количество продуктов и массив продуктов. - выполняет GET запрос через api.get() с параметром '/product/'; - ожидает ответ в виде Promise с объектом типа TGetProducts и возвращает его. postCustomer(data: object): Promise<TPostCustomers> - отправляет на сервер данные о покупателе - выполняет POST запрос через api.post() с параметром '/order/';

### Слой представления
Интерфейс IGallery
Описывает структуру данных для галереи товаров. Содержит поле catalog.

Интерфейс ICard
Базовый интерфейс для карточки товара. Включает поле title для названия продукта и поле price для его стоимости, которое может быть числом или null.

Интерфейс ICardWhithImage extends ICard
Наследует ICard и расширяет его. Добавляет поле image для ссылки на изображение товара и поле category для указания категории продукта.

Интерфейс ICardDetail extends ICardWhithImage
Наследует ICardWithImage. Содержит дополнительное поле description для полного описания товара.

Интерфейс ICardBasket extends ICard
Наследует ICard. Добавляет поле itemIndex, которое хранит номер товара в корзине.

Интерфейс IHeader
Описывает данные для шапки сайта. Содержит поле counter, отображающее количество товаров в корзине.

Интерфейс IBasket
Описывает структуру корзины. Включает поле basketList для списка товаров и поле basketPrice для итоговой стоимости.

Интерфейс IModalContainer
Описывает модальное окно. Содержит поле content для хранения HTML-элемента с содержимым окна.

Интерфейс IOrderSuccess
Описывает окно успешного заказа. Содержит поле successDescription для текста сообщения об успешной оплате.

Интерфейс IForm
Базовый интерфейс для форм. Содержит поле textError для отображения ошибок валидации.

Интерфейс IOrderActions
Поля интерфейса onChooseCard?: () => void - выбран способ оплаты онлайн onChooseCash?: () => void - выбран способ оплаты на месте onAddressInput?: (value: string) => void - ввод адреса onClickFurther?: () => void - нажатие на кнопку Далее onEmailInput?: (value: string) => void - ввод email onPhoneInput?: (value:string) => void - ввод телефона onClickPay?: () => void - нажатие на кнопку Оплатить

Интерфейс IFormOrder extends IForm
Поля интерфейса payment: string | null address: string | null

#### Класс CardCatalog extends CardWithImage
Класс хранит информацию об элементах разметки карточки продукта в каталоге

Конструктор класса constructor(container: HTMLElement, actions?: ICardActions)

вызывает конструктор родительского класса, вешает слушатель на элемент карточки

Поля класса все поля наследуются из родительских абстрактных классов

Методы класса все методы наследуются от родительских абстрактных классов

#### Класс CardDetail extends CardWithImage
Класс хранит информацию об элементах разметки детальной карточки продукта

Конструктор класса cconstructor(container: HTMLElement, actions?: ICardActions)

вызывает конструктор родительского класс, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку addButton

Поля класса descriptionElement - хранит информацию об элементе разметки .card__text addButton - хранит информацию об элементе разметки .card__button

Методы класса set description(value: string) - получает описание продукта и выводит ее в соответствующий элемент разментки

#### Класс Gallery
Класс представления, который отвечает за блок разметки gallary

Конструктор класса: constructor(protected events: IEvents, container: HTMLElement) - вызывает конструктор родительского класса Container, находит элемент разметки и сохраняет в поле класса catalogElement.

#### Абстрактный класс Card<ICard> extends Component<ICard>
Общий родительский класс для всех карточек, наследует класс Component с типом ICard

Конструктор класса: constructor(container: HTMLElement)

вызывает конструктор родительского класса Component, находит элементы резметки и сохраняет их в поля класса

Поля класса: titleElement: HTMLElement - хранит информацию об элементе разметки .card__title priceElement: HTMLElement - хранит информацию об элементе разметки .card__price

Методы класса: set title (value: string) - получает наименование продукта и выводит его в соответствующий элемент разметки set price (value: number | null) - полуает стоимость продукта и выводит его в соответствующий элемент разментки

#### Абстрактный класс CardWithImage extends Card
Общий родительский класс для карточек, в которых есть изображение и категория

Конструктор класса constructor(container: HTMLElement)

Поля класса imageElement - хранит информацию об элементе разметки .card__image categoryElement - хранит информацию об элементе разметки .card__category

Методы класса set category(value: string) - получает категорию продукта и выводит ее в соответствующий элемент разментки set image(value: string) - получает путь к изображению продукта и выводит ее в соответствующий элемент разментки в src

#### Класс CardBasket extends Card
Класс хранит информацию об элементах разметки детальной карточки продукта

Конструктор класса constructor(container: HTMLElement, actions?: ICardActions)

вызывает конструктор родительского класса, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку addButton

Поля класса descriptionElement - хранит информацию об элементе разметки .card__text addButton - хранит информацию об элементе разметки .card__button

Методы класса set description(value: string) - получает описание продукта и выводит ее в соответствующий элемент разментки

#### Класс Header extends Component
Класс хранит информацию об элементах разметки кнопки корзины в шапке сайта

Конструктор класса constructor(protected events: IEvents, container: HTMLElement)

вызывает конструктор родительского класса, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку basketButton

Поля класса basketButton - хранит информацию об элементе разметки .header__basket counterElement - хранит информацию об элементе разметки .header__basket-counter

Методы класса set counter(value: number) - получает количнство продуктов в корзине и выводит их в соответствующий элемент разметки

#### Класс Basket extends Component
Класс хранит информацию об элементах разметки корзины со списком продуктов в корзине

Конструктор класса constructor(container: HTMLElement)

вызывает конструктор родительского класса, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку basketButton

Поля класса basketListElement - хранит информацию об элементе разметки .basket__list basketButton - хранит информацию об элементе разметки .basket__button basketPriceElement - хранит информацию об элементе разметки .basket__price

Методы класса set basketList(items: HTMLElement[]) - получает список элементов карточек продуктов, добавленных в корзину и выводит их в соответствующий элемент разметки set basketPrice(value: string) - получает общую стоимость продуктов в корзине и выводит в соответствующий элемент разметки

#### Класс ModalContainer extends Component
Класс описывает элементы разметки модального окна

Конструктор класса constructor(container: HTMLElement, actions?: ICloseAction) 

вызывает конструктор родительского класса, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку closeButton

Поля класса closeButton - хранит информацию об элементе разметки .modal__close contentElement - хранит информацию об элементе разметки .modal__content

Методы класса set content(value: HTMLElement) - получает контент в виде HTMLElement, который выводится в соответствующий элемент разметки open() - метод отображения модального окна close() - метод закрытия модального окна

#### Класс OrderSuccess extends Component
Класс описывает элементы разметки, которые выводятся в модальном окне при успешном оформлении заказа

Конструктор класса constructor(container: HTMLElement)

вызывает конструктор родительского класса, находит элементы разметки и записывает их в поля класса и вешает слушатель на кнопку buttonClose

Поля класса buttonClose - хранит информацию об элементе разметки .order-success__close descriptionElement - хранит информацию об элементе разметки .order-success__description

Методы класса set successDescription(value: string) - получает текст строкой, который выводится в соответствующий элемент разметки

#### Абстрактный класс class Form extends Component
Общий родительский класс для форм ввода данных customer

Конструктор класса constructor(container: HTMLElement) - вызывает конструктор родительского класса, находит элементы разметки и записывает их

Поля класса protected submitButton: HTMLButtonElement - хранит ссылку на элемент разметки button[type="submit"] protected errorsElement: HTMLElement - хранит ссылку на элемент разметки .form__errors

#### Класс FormOrder extends Form
Класс хранит информацию об элементах разметки формы с возможностью выбора способа оплаты и ввода адреса

Конструктор класса constructor(container: HTMLElement, actions: IOrderActions) - вызывает конструктор родительского класса, находит элементы разметки и записывает их

Поля класса protected addressInput: HTMLInputElement - хранит ссылку на элемент разметки input[name="address"] protected cardButton: HTMLButtonElement - хранит ссылку на элемент разметки button[name="card"] protected cashButton: HTMLButtonElement - хранит ссылку на элемент разметки 'button[name="cash"]

Методы класса: set payment(value: string | null) - отображает выбранный способ оплаты set address(value: string | null) - отображает адрес из customer.address set textError(customerErrors: CustomerErrors) - выводит ошибки на экран

#### Класс FormContacts extends Form
Класс хранит информацию об элементах разметки формы с возможностью ввод номера телефона и email

Конструктор класса constructor(container: HTMLElement, actions: IOrderActions) - вызывает конструктор родительского класса, назодит элементы разметки и записывает их

Поля класса protected emailInput: HTMLInputElement - хранит ссылку на элемент разметки input[name="email"] protected phoneInput: HTMLInputElement - хранит ссылку на элемент разметки input[name="phone"]

Методы класса: set email(value: string | null) - отображает email из customer.email sset phone(value: string | null) - отображает адрес из customer.address set textError(customerErrors: CustomerErrors) - выводит ошибки на экран

###  События
#### событие catalog:changed
Producer: Catalog (Model) — setProducts()
Trigger: после успешной записи товаров в модель catalog.products
Consumers: main.ts (Presenter)
Effects:
Presenter читает catalog.getProducts()
создаёт карточки CardCatalog
отдаёт массив элементов в gallery.render({ catalog: itemCards })

#### событие card-catalog:click
Producer: CardCatalog (через action onClick)
Trigger: после клика пользователя на карточку в каталоге продуктов cardCatalog.container;
Consumers: main.ts (Presenter)
Effects:
Presenter вызывает метод записи выбранного продукта catalog.setSelectedProduct(product)

#### событие card:selected
Producer: Catalog (Model) - setSelectedProduct()
Trigger: сохранение selectedProduct в модель данных;
Consumers: main.ts (Presenter)
Effects:
Presenter создает детальную карточку продукта product
отдает продукт в card.render(product)
записывает карточку в модальное окно modal.content
вызывает отображение модального окна modal.open

#### событие modal:close
Producer: ModalContainer (через action onClick)
Trigger: пользователь нажимает на кнопку .modal__close
Consumers: main.ts (Presenter)
Effects:
Presenter вызывает метод закрытия модального окна modal.close

#### событие cart:changed
Producer: Cart (Model) - addToCart() / removeFromCart();
Trigger: вызван метод cart.addToCart(product) / cart.removeFromCart();
Consumers: main.ts (Presenter)
Effects:
Presenter перерисовывает детальную карточку продукта
перерисовывает счетчик количества продуктов в корзине в header
перерисовывает корзину

#### событие header-basket:click
Producer: Header (через action onClick)
Trigger: пользователь нажимает на кнопку .header__basket
Consumers: main.ts (Presenter)
Effects:
рендерит карточку корзины
выводит в модальное окно контет корзины
basket-button:click
Producer: Basket (через action onClick)
Trigger: пользователь нажал на кнопку "Оформить" в корзине
Consumers: main.ts (Presenter)
Effects:
Presenter создает карточку FormOrder
заполняет данными клиента из customer
выводит карточку в модальное окно

#### событие order:pay
Producer: FormContacts (через action onClickPay)
Trigger: пользователь нажимает кнопку “Оплатить”
Consumers: main.ts (Presenter)
Effects:
читает данные клиента: customer.getData()
собирает payload customerData: TCustomerApi:
email, address, phone, payment
total = cart.getTotalPrice()
items = cart.getCartProducts().map(i => i.id)
вызывает webLarekApi.postCustomer(customerData)
если успех:
рендерит OrderSuccess (submitRender())
очищает корзину/клиента и обновляет счетчик (contentClear())
если ошибка: логирует ошибку в консоль

#### событие contact:email
Producer: FormContacts (через action onEmailInput)
Trigger: пользователь вводит значение в поле input[name="email"]
Consumers: main.ts (Presenter)
Effects:
вызывает запись email в данные customer.setEmail(email)

#### событие contact:phone
Producer: FormContacts (через action onPhoneInput)
Trigger: пользователь вводит значение в поле input[name="phone"]
Consumers: main.ts (Presenter)
Effects:
вызывает customer.setPhone(phone)

#### событие form-order-button:click
Producer: FormOrder (через action onClickFurther)
Trigger: пользователь нажимает кнопку “Далее” в форме заказа
Consumers: main.ts (Presenter)
Effects:
вызывает отрисовку формы с контактной информацией formContactsRender()
внутри formContactsRender():
подставляет formContacts.email/phone из customer.getData()
кладёт форму в модальное окно: modal.content = formContacts.render()

#### событие customer-address:input
Producer: FormOrder (через action onAddressInput)
Trigger: пользователь вводит значение в поле input[name="address"]
Consumers: main.ts (Presenter)
Effects:
вызывает запись адреса в модель данных customer.setAddress(address)

#### событие customer:changed
Producer: Customer (model) setPayment() /setAddress() / setEmail() / setPhone()
Trigger: изменение данных в customer
Consumers: main.ts (Presenter)
Effects:
вызывает отрисовку формы заказа FormOrder
вызывает отрисовку формы контактов FormContact

#### событие payment:card
Producer: FormOrder (через action onChooseCard)
Trigger: пользователь нажимает кнопку button[name="card"] (Онлайн)
Consumers: main.ts (Presenter)
Effects:
вызывает сохранение информации о выбранном способе оплаты customer.setPayment('card')
событие payment:cash
Producer: FormOrder (через action onChooseCash)
Trigger: пользователь нажимает кнопку button[name="cash"] (При получении)
Consumers: main.ts (Presenter)
Effects:
вызывает сохранение информации о выбранном способе оплаты customer.setPayment('cash')

#### событие card-detail:click
Producer: CardDetail (через action onClick)
Trigger: пользователь нажимает на кнопку .card__button в детальной карточке товара
Consumers: main.ts (Presenter)
Effects:
получает выбранный товар через catalog.getSelectedProduct()
проверяет наличие товара в корзине cart.hasProduct(id)
если товар уже в корзине — вызывает cart.removeFromCart(product)
если товара нет в корзине — вызывает cart.addToCart(product)
обновляет отображение детальной карточки cardDetailViewRender()

#### событие card-basket:click
Producer: CardBasket (через action onClick)
Trigger: пользователь нажимает кнопку удаления товара в карточке корзины
Consumers: main.ts (Presenter)
Effects:
вызывает удаление товара из корзины cart.removeFromCart(product)
инициирует событие cart:changed, что приводит к:
перерисовке корзины
обновлению счетчика товаров в Header
обновлению детальной карточки