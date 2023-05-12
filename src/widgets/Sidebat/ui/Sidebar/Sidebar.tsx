import { classNames } from 'shared/lib/classNames/classNames';

import { PropsWithChildren, useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>) {
	const { className } = props;

	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
			<button type="button" onClick={onToggle}>Toggle</button>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher className={cls.lang} />
			</div>
		</div>
	);
}
