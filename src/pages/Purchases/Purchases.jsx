import { useState } from 'react';
import { AddPurchaseForm, Button, PurchaseCard } from '../../components/';
import { useSelector, useDispatch } from 'react-redux';
import { purchasesSlice } from '../../store/reducers/PurchasesSlice';
import { Modal } from '../../components';
import styles from './Purchases.module.scss';

const sorting = [
  { value: 'asc_price', text: 'Ascending price' },
  { value: 'desc_price', text: 'Descending price' },
  { value: 'asc_time', text: 'Ascending time' },
  { value: 'desc_time', text: 'Descending time' },
];

export function Purchases() {
  const [modalActive, setModalActive] = useState(false);
  const purchases = useSelector(state => state.purchases.items);
  const [ sortBy, setSortBy ] = useState(sorting[0].value);
  const { addPurchase } = purchasesSlice.actions;
  const dispatch = useDispatch();

  function addNewPurchase({ name, category, price }) {
    dispatch(addPurchase({ name, category, price }));
    setModalActive(false);
  };

  function sortPurchases(sortBy) {
    let sortedPurchases;

    switch (sortBy) {
      case sorting[0].value:
        sortedPurchases = [...purchases].sort((a, b) => a.price - b.price);
        break;
      case sorting[1].value:
        sortedPurchases = [...purchases].sort((a, b) => b.price - a.price);
        break;
      case sorting[2].value:
        sortedPurchases = [...purchases].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        break;
      case sorting[3].value:
        sortedPurchases = [...purchases].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        break;
      default:
        break;
    }

    return sortedPurchases;
  }

  return (
    <section className={["app-section", styles.purchases].join(' ')}>
      <div className={styles.add_purchase}>
        <Button type="red" onClick={() => setModalActive(true)}>
          <div>+</div>
          <div>Add new purchase</div>
        </Button>
      </div>
      <div className={styles.last_purchases}>
        <div className={styles.sort}>
          <label htmlFor="sort-param">
            <span>Sorted by</span>
            <select
              id="sort-param"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              {sorting.map(({ value, text }, index) => (
                <option key={index} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.container}>
          {sortPurchases(sortBy).map((data) => (
            <PurchaseCard key={data.id} data={data} />
          ))}
        </div>
        <div className={styles.pagination}>
          <span className="prev">←</span>
          <div className={styles.pages}>
            <span className={styles.active}>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
          <span className="next">→</span>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddPurchaseForm handleSubmit={addNewPurchase} />
      </Modal>
    </section>
  );
}