'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import cn from 'classnames';
import { Check, ChevronDown } from 'lucide-react';

import styles from './Select.module.scss';

type TSelectOption = {
  label: string;
  value: string;
};

type TSelectProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: readonly TSelectOption[];
  placeholder?: string;
  className?: string;
};

const Select = ({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = 'Select option',
  className,
}: TSelectProps) => {
  return (
    <BaseSelect.Root
      defaultValue={defaultValue}
      name={name}
      value={value}
      onValueChange={(value) => {
        if (value !== null) {
          onValueChange?.(value);
        }
      }}
    >
      <BaseSelect.Trigger className={cn(styles.trigger, className)}>
        <BaseSelect.Value placeholder={placeholder} />
        <ChevronDown className={styles.icon} size={16} />
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8}>
          <BaseSelect.Popup className={styles.popup}>
            {options.map((option) => (
              <BaseSelect.Item key={option.value} className={styles.item} value={option.value}>
                <BaseSelect.ItemIndicator className={styles.indicator}>
                  <Check size={14} />
                </BaseSelect.ItemIndicator>

                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};

export { Select };
