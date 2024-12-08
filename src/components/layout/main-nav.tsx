"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={cn("ListItemLink", className)}
          {...props}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNav() {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="NavigationMenuTrigger group text-base font-bold data-[state=open]:bg-accent/50"
            >
              Features
              <CaretDownIcon
                className="CaretDown relative ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="/features/visualization"
                title="Data Visualization"
              >
                Create beautiful and interactive scientific visualizations
              </ListItem>
              <ListItem
                href="/features/ai-assistance"
                title="AI Assistance"
              >
                Get intelligent suggestions and automated analysis
              </ListItem>
              <ListItem
                href="/features/collaboration"
                title="Collaboration"
              >
                Work together with your team in real-time
              </ListItem>
              <ListItem
                href="/features/integration"
                title="Integration"
              >
                Connect with your existing tools and workflows
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="NavigationMenuTrigger group text-base font-bold data-[state=open]:bg-accent/50"
            >
              Solutions
              <CaretDownIcon
                className="CaretDown relative ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="/solutions/research"
                title="Research"
              >
                Tools for academic and scientific research
              </ListItem>
              <ListItem
                href="/solutions/industry"
                title="Industry"
              >
                Enterprise solutions for data analysis
              </ListItem>
              <ListItem
                href="/solutions/education"
                title="Education"
              >
                Resources for teaching and learning
              </ListItem>
              <ListItem
                href="/solutions/custom"
                title="Custom Solutions"
              >
                Tailored solutions for your specific needs
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="NavigationMenuLink text-base font-bold"
              asChild
            >
              <Link href="/pricing">Pricing</Link>
            </Button>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in">
          <div className="Arrow relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition absolute left-0 top-full flex justify-center">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}
