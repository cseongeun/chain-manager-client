/* eslint-disable @next/next/no-img-element */
import React, { BaseSyntheticEvent } from 'react';
import cn from 'classnames';
import Input from '../../../ui/forms/input';
import { Close } from '../../../icons/close';

interface AddressAmountTableType {
  getter: any;
  errGetter: any;
  onChange: any;
  onDelete: any;
}

function AddressAmountTable({
  getter,
  errGetter,
  onChange,
  onDelete,
}: AddressAmountTableType) {
  return (
    <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
      <div className="block w-full overflow-x-auto">
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr>
              <th className="bg-blueGray-600 text-blueGray-200 border-blueGray-500 whitespace-nowrap border border-l-0 border-r-0 border-solid text-left align-middle text-xs font-semibold uppercase">
                id
              </th>
              <th className="bg-blueGray-600 text-blueGray-200 border-blueGray-500 whitespace-nowrap border border-l-0 border-r-0 border-solid px-8 py-3 text-left align-middle text-xs font-semibold uppercase">
                Address
              </th>
              <th className="bg-blueGray-600 text-blueGray-200 border-blueGray-500 whitespace-nowrap border border-l-0 border-r-0 border-solid px-8 py-3 text-left align-middle text-xs font-semibold uppercase">
                Amount
              </th>
              <th className="bg-blueGray-600 text-blueGray-200 border-blueGray-500 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {getter?.map((data: any, index: number) => (
              <tr key={index}>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 ">
                  {index + 1}
                </td>
                <th className="flex items-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 text-left align-middle text-xs">
                  <Input
                    type="text"
                    className="w-full text-red-500"
                    inputClassName={cn(
                      errGetter[index][0]
                        ? 'dark:border-red-700'
                        : 'border-none'
                    )}
                    placeholder="Enter address"
                    value={data[0]}
                    onChange={(e: BaseSyntheticEvent) => {
                      const value = e.target.value;
                      onChange(index, 0, value);
                    }}
                  />
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4  align-middle text-xs">
                  <Input
                    type="number"
                    className="w-full"
                    inputClassName={cn(
                      errGetter[index][1]
                        ? 'dark:border-red-700'
                        : 'border-none'
                    )}
                    min={0}
                    placeholder="Enter amount"
                    value={data[1].replace(/(^0+)/, '')}
                    onChange={(e: BaseSyntheticEvent) => {
                      const value = e.target.value;
                      onChange(index, 1, value);
                    }}
                  />
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-right align-middle text-xs">
                  <button
                    onClick={() => {
                      onDelete(index);
                    }}
                  >
                    <Close />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AddressAmountTable;
