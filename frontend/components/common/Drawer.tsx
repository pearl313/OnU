import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';
import { itemStore } from '@/store/itemStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import nothing from '/public/nothing.png';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? '#FFFFFF' : grey[800],
  boxShadow: '0 -6px 6px -6px rgba(0, 0, 0, 0.2)',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 12,
  left: 'calc(50% - 15px)',
}));

function CompareDrawer(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [itemList, setItemList] = React.useState<Item[]>([]);
  const [alert, setAlert] = React.useState(false);
  const { items, removeItem } = itemStore();
  const router = useRouter();
  itemStore.subscribe((state) => state);

  React.useEffect(() => {
    setItemList(items);
    if (itemList.length === 0) setOpen(false);
    if (itemList.length === 1) setOpen(true);
  }, [itemList, items]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const deleteItem = (id: number) => {
    removeItem(id);
    setItemList(items.filter((item) => item.nutrientId === id));
  };

  const comparePills = (): void => {
    if (itemList.length >= 2)
      router.push(
        `/pillcompare/pill-compare?query=${itemList[0].nutrientId}&compare=${itemList[1].nutrientId}`,
      );
    else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - 40px)`,
            overflow: 'visible',
            width: '360px',
            left: `calc(50% - 180px)`,
            '@media (min-width: 640px)': {
              height: `calc(50% - 32px)`,
              width: '512px',
              left: `calc(50% - 256px)`,
            },
          },
        }}
      />
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onClick={toggleDrawer(!open)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding + 20,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            left: 0,
            right: 0,
          }}
        >
          <div className="p-2 mt-6">
            <Puller />
          </div>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pt: 2,

            height: '100%',
            overflow: 'auto',
          }}
        >
          {/* 비교함 내부 */}
          <div className="flex flex-col items-center space-y-4">
            {/* <div className="flex flex-col items-center w-full sm:flex-row sm:justify-center"> */}
            <div className="flex items-center w-full sm:justify-center">
              <div className="indicator">
                {itemList[0] ? (
                  <div className="bg-gray-300 border-none indicator-item badge top-2 right-4">
                    <button
                      onClick={() =>
                        deleteItem(itemList[0].nutrientId)
                      }
                    >
                      X
                    </button>
                  </div>
                ) : null}
                {itemList[0] ? (
                  <div className="grid flex-grow h-48 w-36 sm:w-52 sm:h-52 card rounded-box place-items-center">
                    <div className="flex flex-col items-center flex-grow">
                      <Image
                        src={itemList[0]?.nutrientImageUrl}
                        alt="item-img"
                        width={140}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />

                      <span
                        id="manufacturer"
                        className="mt-0.5 text-xs font-bold text-[#909090]"
                      >
                        {itemList[0]?.nutrientBrand}
                      </span>
                      <span
                        id="name"
                        className="text-sm font-extrabold text-[#3A3A3A]"
                      >
                        {itemList[0]?.nutrientName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid flex-grow h-48 w-36 sm:w-52 sm:h-52 card bg-base-300 rounded-box place-items-center" />
                )}
              </div>

              <div className="divider divider-horizontal" />
              <div className="indicator">
                {itemList[1] ? (
                  <div className="bg-gray-300 border-none indicator-item badge top-2 right-4">
                    <button
                      onClick={() =>
                        deleteItem(itemList[1].nutrientId)
                      }
                    >
                      X
                    </button>
                  </div>
                ) : null}
                {itemList[1] ? (
                  <div className="grid flex-grow h-48 w-36 sm:w-52 sm:h-52 card rounded-box place-items-center">
                    <div className="flex flex-col items-center flex-grow">
                      <Image
                        src={itemList[1]?.nutrientImageUrl}
                        alt="item-img"
                        width={140}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />

                      <span
                        id="manufacturer"
                        className="mt-0.5 text-xs font-bold text-[#909090]"
                      >
                        {itemList[1]?.nutrientBrand}
                      </span>
                      <span
                        id="name"
                        className="text-sm font-extrabold text-[#3A3A3A]"
                      >
                        {itemList[1]?.nutrientName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid flex-grow h-48 w-36 sm:w-52 sm:h-52 card bg-base-300 rounded-box place-items-center"></div>
                )}
              </div>
            </div>
            <button
              className="btn btn-wide btn-sm"
              onClick={comparePills}
            >
              비교하기
            </button>
          </div>
        </StyledBox>
      </Drawer>

      <Transition
        show={alert}
        enter="transition ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>비교할 상품이 없습니다</span>
            </div>
          </div>
        </div>
      </Transition>
    </Root>
  );
}

export default CompareDrawer;
